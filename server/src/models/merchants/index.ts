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

/**
 * @fileoverview This file contains the database operations related to Merchant
 * entities.
 * @author Karen Frilya Celine
 */

import {Datastore} from '@google-cloud/datastore';
import {Guid} from 'guid-typescript';

const datastore = new Datastore();
const KIND = 'Merchant';

async function getMerchants() {
  const query = datastore.createQuery(KIND);
  return await datastore.runQuery(query);
}

async function getMerchant(merchantId: string) {
  const key = datastore.key([KIND, merchantId]);
  return await datastore.get(key);
}

async function addMerchant(merchant: object) {
  return await datastore.insert({
    key: datastore.key([KIND, Guid.raw()]),
    data: merchant,
  });
}

export const merchantsModel = {
  getMerchants,
  getMerchant,
  addMerchant,
};
