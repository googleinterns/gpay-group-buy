/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Datastore, Transaction} from '@google-cloud/datastore';
import {Entity} from '@google-cloud/datastore/build/src/entity';

import {Filter, OrderRule, StringKeyObject} from '../interfaces';
import {UpdateRule} from './interfaces';

const datastore = new Datastore();

type TransactionResponse = number | void;
type TransactionOperation = (
  transaction: Transaction
) => Promise<TransactionResponse>;

/**
 * A higher order function that creates a transaction and carries out all
 * input datastore operations in the same transaction.
 * Returns the response of each operation carried out in the transaction in
 * an array, in the same order they are called.
 * @param opFns Operations to be carried out in the same transaction
 */
export const makeTransaction = async (
  ...opFns: TransactionOperation[]
): Promise<TransactionResponse[]> => {
  const transaction = datastore.transaction();

  const res = [];

  try {
    await transaction.run();

    for (const fn of opFns) {
      res.push(await fn(transaction));
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new Error(`Transaction failed. ${err.message}`);
  }
  return res;
};

/**
 * Strips the key from the datastore response object, extracts the id,
 * and append the id to the object.
 * Returns an object with its id.
 * @param res The response object from datastore
 */
const extractAndAppendId = (res: Entity) => {
  const {[datastore.KEY]: key, ...properties} = res;
  return {
    ...properties,
    id: Number(key.id),
  };
};

/**
 * A Datastore wrapper that gets a particular entity with the specified Kind and id.
 * If actor is not specified, gets using datastore.
 * @param kind The Kind that is being retrieved
 * @param id The id of the Entity being retrieved
 * @param actor Datastore or Transaction that will carry out the retrieval
 */
export const getEntity = async (
  kind: string,
  id: number,
  actor: Transaction | Datastore = datastore
) => {
  const key = datastore.key([kind, id]);

  try {
    const [res] = await actor.get(key);
    return extractAndAppendId(res);
  } catch (err) {
    throw new Error(`${kind} ${id} does not exist`);
  }
};

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and gets
 * the entity in the transaction.
 * @param kind The Kind that is being retrieved
 * @param id The id of the Entity being retrieved
 */
export const getEntityInTransaction = async (kind: string, id: number) => (
  transaction: Transaction
) => getEntity(kind, id, transaction);

/**
 * A Datastore wrapper that gets all entities of a specified Kind.
 * If actor is not specified, gets using datastore.
 * @param kind The Kind that is being queried
 * @param filters Any filters that will be applied to the query
 * @param orderRules Any order rules that will be used to sort the query result.
 * If an orderRule doesn't have a descending property specified, the default
 * direction is ascending.
 * @param actor Datastore or Transaction that will carry out the query
 */
export const getAllEntities = async (
  kind: string,
  filters?: Filter[],
  orderRules?: OrderRule[],
  actor: Transaction | Datastore = datastore
) => {
  try {
    let query = actor.createQuery(kind);
    filters?.forEach(filter => {
      query = query.filter(filter.property, filter.value);
    });

    orderRules?.forEach(({property, descending}) => {
      query = query.order(property, {descending});
    });

    const [res] = await actor.runQuery(query);
    const resWithId = res.map(item => extractAndAppendId(item));
    return resWithId;
  } catch (err) {
    throw new Error(`Failed to get entities of ${kind}.`);
  }
};

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and gets
 * the entity in the transaction.
 * @param kind The Kind that is being queried
 * @param filters Any filters that will be applied to the query
 * @param orderRules Any order rules that will be used to sort the query result.
 * If an orderRule doesn't have a descending property specified, the default
 * direction is ascending.
 */
export const getAllEntitiesInTransaction = async (
  kind: string,
  filters?: Filter[],
  orderRules?: OrderRule[]
) => (transaction: Transaction) => getAllEntities(kind, filters, orderRules, transaction);

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and
 * inserts an entity if another entity with the same unique properties does not exist.
 * Throws an error if such an entity exists.
 * @param transaction Transaction that will carry out the insertion
 * @param kind Kind of the entity to be inserted
 * @param entity Entity to be inserted
 * @param uniqueProperties The properties that should be unique for the specified kind
 */
const uniqueInsertInTransaction = (
  kind: string,
  entity: Entity,
  uniqueProperties: Filter[]
) => async (transaction: Transaction) => {
  let query = transaction.createQuery(kind);
  uniqueProperties.forEach(filter => {
    query = query.filter(filter.property, filter.value);
  });
  const [queryRes] = await transaction.runQuery(query);
  if (queryRes.length > 0) {
    const properties = uniqueProperties
      .map(unique => unique.property)
      .join(', ');
    throw new Error(
      `Another entity with the same ${properties} already exists.`
    );
  }
  transaction.insert(entity);
};

/**
 * Inserts a particular entity with the specified Kind if another
 * entity with the same value for the specified unique property does not already exist.
 * An error is thrown if an entity with the same unique property value already exists.
 * @param kind The Kind of the Entity
 * @param entity The Entity to be added
 * @param uniqueProperty The property that should be unique for the specified kind
 */
const insertUniqueEntity = async (
  kind: string,
  entity: Entity,
  uniqueProperties: Filter[]
) => makeTransaction(uniqueInsertInTransaction(kind, entity, uniqueProperties));

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind and returns
 * the id of the inserted entity.
 * If uniqueProperties are specified, the entity would not be added if another entity with the
 * same value for the unique properties already exists.
 * If actor is not specified, adds using datastore.
 * @param kind The Kind of the Entity to be added
 * @param data The data of the Entity to be added
 * @param uniqueProperties The properties that should be unique for the specified kind
 * @param actor Datastore or Transaction that will carry out the adding
 */
export const addEntity = async (
  kind: string,
  data: object,
  uniqueProperties?: Filter[],
  actor: Transaction | Datastore = datastore
) => {
  const key = datastore.key(kind);
  const entity = {key, data};

  try {
    if (uniqueProperties === undefined) {
      actor.insert(entity);
    } else if (actor instanceof Datastore) {
      await insertUniqueEntity(kind, entity, uniqueProperties);
    } else if (actor instanceof Transaction) {
      await uniqueInsertInTransaction(kind, entity, uniqueProperties)(actor);
    }
  } catch (err) {
    throw new Error(`Failed to add ${key}. ${err.message}`);
  }
  return Number(key.id);
};

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and adds
 * the entity in the transaction.
 * @param kind The Kind of the Entity to be added
 * @param data The data of the Entity to be added
 * @param uniqueProperties The properties that should be unique for the specified kind
 */
export const addInTransaction = (
  kind: string,
  data: object,
  uniqueProperties?: Filter[]
) => async (transaction: Transaction) =>
  addEntity(kind, data, uniqueProperties, transaction);

/**
 * Update original data in-place according to the update field.
 * @param original Original data to be updated
 * @param updateRule Rule to update the data by
 */
const updateData = (original: StringKeyObject, updateRule: UpdateRule) => {
  const operation = updateRule.op || 'replace';
  let value = original?.[updateRule.property];
  if (value === undefined) {
    throw new Error(`Property to be updated does not exist on ${original}`);
  }

  switch (operation) {
    case 'add':
      value += updateRule.value;
      break;
    case 'subtract':
      value -= updateRule.value;
      break;
    case 'replace':
      value = updateRule.value;
      break;
  }
  original[updateRule.property] = value;
};

/**
 * A Datastore wrapper that updates an entity with the specified kind and id
 * according to the update rules.
 * If actor is not specified, updates using datastore.
 * @param kind Kind of the entity to be updated
 * @param id id of the entity to be updated
 * @param updateRules Rules to update the entity
 * @param actor Datastore or Transaction that will carry out the update
 */
export const updateEntity = async (
  kind: string,
  id: number,
  updateRules: UpdateRule[],
  actor: Transaction | Datastore = datastore
) => {
  const key = datastore.key([kind, id]);

  try {
    const [data] = await actor.get(key);
    updateRules.forEach(updateRule => updateData(data, updateRule));

    const entity = {
      key,
      data,
    };
    actor.update(entity);
  } catch (err) {
    throw new Error(`Failed to update ${key}. ${err.message}`);
  }
};

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and updates
 * an entity in the transaction.
 * @param kind Kind of the entity to be updated
 * @param id id of the entity to be updated
 * @param updateRules Rules to update the entity
 */
export const updateInTransaction = (
  kind: string,
  id: number,
  updateRules: UpdateRule[]
) => async (transaction: Transaction) =>
  updateEntity(kind, id, updateRules, transaction);

/**
 * A Datastore wrapper that deletes an entity with the specified id.
 * If actor is not specified, deletes using datastore.
 * @param kind Kind of the entity to be deleted
 * @param id Id of the entity to be deleted
 * @param actor Datastore or Transaction that will carry out the deletion
 */
export const deleteEntity = async (
  kind: string,
  id: number,
  actor: Transaction | Datastore = datastore
) => {
  const key = datastore.key([kind, id]);

  try {
    actor.delete(key);
  } catch (err) {
    throw new Error(`Failed to delete ${key}. ${err.message}`);
  }
};

/**
 * A higher order function.
 * Returns a function that takes in a transaction object and deletes
 * an entity in the transaction.
 * @param kind Kind of the entity to be deleted
 * @param id Id of the entity to be deleted
 */
export const deleteInTransaction = (kind: string, id: number) => async (
  transaction: Transaction
) => deleteEntity(kind, id, transaction);
