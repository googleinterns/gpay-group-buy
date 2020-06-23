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

const datastore = new Datastore();

/**
 * A Datastore wrapper that gets a particular entity with the specified Kind and id.
 * @param kind The Kind that is being queried
 * @param id The id of the Entity being queried
 */
const getWithId = async (kind: string, id: string) => {
  const key = datastore.key([kind, datastore.int(id)]);
  const [res] = await datastore.get(key);
  const {[datastore.KEY]: _, ...properties} = res;
  return {
    ...properties,
    id: key.id,
  };
};

/**
 * A Datastore wrapper that inserts a particular entity with the specified Kind.
 * @param kind The Kind of the Entity
 * @param data The data of the Entity to be added
 */
const add = async (kind: string, data: object) => {
  const key = datastore.key(kind);
  const entity = {key, data};
  await datastore.insert(entity);
};

export {getWithId};
