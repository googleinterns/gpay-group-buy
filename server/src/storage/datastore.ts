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

import {Filter, StringKeyObject} from '../interfaces';
import {UpdateRule} from './interfaces';

const datastore = new Datastore();

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
 * @param kind The Kind that is being queried
 * @param id The id of the Entity being queried
 */
export const get = async (kind: string, id: number) => {
  try {
    const key = datastore.key([kind, id]);
    const [res] = await datastore.get(key);
    return extractAndAppendId(res);
  } catch (err) {
    throw new Error(`${kind} ${id} does not exist`);
  }
};

/**
 * A Datastore wrapper that gets all entities of a specified Kind.
 * @param kind The Kind that is being queried
 * @param filters Any filters that will be applied to the query
 */
export const getAll = async (kind: string, filters?: Filter[]) => {
  let query = datastore.createQuery(kind);
  filters?.forEach(filter => {
    query = query.filter(filter.property, filter.value);
  });

  const [res] = await datastore.runQuery(query);
  const resWithId = res.map(item => extractAndAppendId(item));
  return resWithId;
};

/**
 * Inserts an entity if another entity with the same unique properties does not exist.
 * Throws an error if such an entity exists.
 * @param transaction Transaction that will carry out the insertion
 * @param kind Kind of the entity to be inserted
 * @param entity Entity to be inserted
 * @param uniqueProperties The properties that should be unique for the specified kind
 */
const uniqueInsertInTransaction = async (
  transaction: Transaction,
  kind: string,
  entity: Entity,
  uniqueProperties: Filter[]
) => {
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
 * A Datastore wrapper that inserts an entity and updates a related entity in the same transaction.
 * Returns the id of the entity that is inserted.
 * If uniqueProperties are specified,
 * An error is thrown if an entity with the same set of unique properties already exists.
 * @param kindToInsert Kind of the entity to be inserted
 * @param dataToInsert Data of the entity to be inserted
 * @param relatedKindToUpdate Kind of the related entity to be updated
 * @param updateRules Rules to update the related entity
 * @param uniqueProperties The properties that should be unique for the specified kindToInsert
 */
export const addAndUpdateRelatedEntity = async (
  kindToInsert: string,
  dataToInsert: object,
  relatedKindToUpdate: string,
  relatedIdToUpdate: number,
  updateRules: UpdateRule[],
  uniqueProperties?: Filter[]
): Promise<number> => {
  const transaction = datastore.transaction();

  const keyToInsert = datastore.key(kindToInsert);
  const entityToInsert = {key: keyToInsert, data: dataToInsert};

  const keyToUpdate = datastore.key([relatedKindToUpdate, relatedIdToUpdate]);

  try {
    await transaction.run();

    if (uniqueProperties) {
      await uniqueInsertInTransaction(
        transaction,
        kindToInsert,
        entityToInsert,
        uniqueProperties
      );
    } else {
      transaction.insert(entityToInsert);
    }

    const [data] = await transaction.get(keyToUpdate);
    updateRules.forEach(updateRule => updateData(data, updateRule));

    const entityToUpdate = {
      key: keyToUpdate,
      data,
    };
    transaction.update(entityToUpdate);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new Error(`Failed to add ${kindToInsert}. ${err}`);
  }
  return Number(keyToInsert.id);
};

/**
 * Deletes an entity and updates a related entity in the same transaction.
 * @param kindToDelete Kind of the entity to be deleted
 * @param idToDelete Id of the entity to be deleted
 * @param relatedKindToUpdate Kind of the related entity to be updated
 * @param updateRules Rules to update the related entity
 */
export const deleteAndUpdateRelatedEntity = async (
  kindToDelete: string,
  idToDelete: number,
  relatedKindToUpdate: string,
  relatedIdToUpdate: number,
  updateRules: UpdateRule[]
) => {
  const transaction = datastore.transaction();

  const keyToDelete = datastore.key([kindToDelete, idToDelete]);

  const keyToUpdate = datastore.key([relatedKindToUpdate, relatedIdToUpdate]);

  try {
    await transaction.run();
    transaction.delete(keyToDelete);

    const [data] = await transaction.get(keyToUpdate);
    updateRules.forEach(updateRule => updateData(data, updateRule));

    const entityToUpdate = {
      key: keyToUpdate,
      data,
    };
    transaction.update(entityToUpdate);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new Error(`Failed to delete ${keyToDelete}. ${err}`);
  }
};

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind if another
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
) => {
  const transaction = datastore.transaction();

  try {
    await transaction.run();
    await uniqueInsertInTransaction(
      transaction,
      kind,
      entity,
      uniqueProperties
    );
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new Error(`Failed to add ${kind}. ${err}`);
  }
};

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind and returns
 * the id of the inserted entity.
 * If uniqueProperty is specified, the entity would not be added if another entity with the
 * same unique property value already exists.
 * @param kind The Kind of the Entity
 * @param data The data of the Entity to be added
 * @param uniqueProperty The property that should be unique for the specified kind
 */
export const add = async (
  kind: string,
  data: object,
  uniqueProperties?: Filter[]
): Promise<number> => {
  const key = datastore.key(kind);
  const entity = {key, data};

  if (uniqueProperties !== undefined) {
    await insertUniqueEntity(kind, entity, uniqueProperties);
  } else {
    await datastore.insert(entity);
  }

  const id = key.id;
  if (id === null || id === undefined) {
    throw new Error(`Failed to add ${kind}.`);
  }
  return Number(id);
};
