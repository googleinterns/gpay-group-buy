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
import {google} from '@google-cloud/datastore/build/protos/protos';
import {Entity} from '@google-cloud/datastore/build/src/entity';

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
const getWithId = async (kind: string, id: string) => {
  const key = datastore.key([kind, datastore.int(id)]);
  const [res] = await datastore.get(key);
  return extractAndAppendId(res);
};

/**
 * A Datastore wrapper that gets all entities of a specified Kind.
 * @param kind The Kind that is being queried
 */
const getAllWithId = async (kind: string) => {
  const query = datastore.createQuery(kind);
  const [res] = await datastore.runQuery(query);
  const resWithId = res.map(item => extractAndAppendId(item));
  return resWithId;
};

/**
 * Unpacks id of modified object from MutationResult object.
 */
const getIdFromMutationResult = (
  mutationResult: google.datastore.v1.IMutationResult
): number => {
  return Number(mutationResult?.key?.path?.[0]?.id);
};

/**
 * Unpacks ids of modified objects from CommitResponse object received from Datastore.
 */
const getIdsFromCommitResponse = (
  res: google.datastore.v1.ICommitResponse
): number[] | undefined => {
  return res.mutationResults?.map(getIdFromMutationResult);
};

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind.
 * @param kind The Kind of the Entity
 * @param data The data of the Entity to be added
 */
const add = async (kind: string, data: object): Promise<number> => {
  const key = datastore.key(kind);
  const entity = {key, data};
  const [res] = await datastore.insert(entity);
  const ids = getIdsFromCommitResponse(res);
  if (ids === undefined || ids.length < 1 || Number.isNaN(ids[0])) {
    throw new Error(`Failed to add ${kind}.`);
  }
  return ids[0];
};

export {getWithId, getAllWithId, add};
