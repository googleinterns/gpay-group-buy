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

import {Datastore} from '@google-cloud/datastore';
import {Entity} from '@google-cloud/datastore/build/src/entity';

import {Filter} from './interfaces';

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
  const key = datastore.key([kind, id]);
  const [res] = await datastore.get(key);
  return extractAndAppendId(res);
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
  uniqueProperty: Filter
): Promise<Entity | undefined> => {
  const transaction = datastore.transaction();
  const query = transaction
    .createQuery(kind)
    .filter(uniqueProperty.property, uniqueProperty.value);

  try {
    await transaction.run();
    const [queryRes] = await transaction.runQuery(query);
    if (queryRes && queryRes.length > 0) {
      // An entity with the unqiue property already exists
      await transaction.rollback();
      throw new Error(
        `Another entity with the same ${uniqueProperty.property} already exists.`
      );
    }
    // Create the entity
    transaction.insert(entity);
    await transaction.commit();
    return;
  } catch (err) {
    await transaction.rollback();
    throw new Error(`Failed to add ${kind}. ${err}`);
  }
};

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind and returns
 * the id of the inserted entity.
 * If uniqueProperty is specified, the entity would not be added if another entity with the same unique property value already exists.
 * @param kind The Kind of the Entity
 * @param data The data of the Entity to be added
 * @param uniqueProperty The property that should be unique for the specified kind
 */
export const add = async (
  kind: string,
  data: object,
  uniqueProperty?: Filter
): Promise<number> => {
  const key = datastore.key(kind);
  const entity = {key, data};

  if (uniqueProperty !== undefined) {
    await insertUniqueEntity(kind, entity, uniqueProperty);
  } else {
    await datastore.insert(entity);
  }

  const id = key.id;
  if (id === null || id === undefined) {
    throw new Error(`Failed to add ${kind}.`);
  }
  return Number(id);
};
