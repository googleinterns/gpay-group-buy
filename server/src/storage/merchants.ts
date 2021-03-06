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
 */

import {MERCHANT_KIND} from '../constants/kinds';
import {Filter, MerchantPayload, MerchantResponse} from '../interfaces';
import {addEntity, getEntity, getAllEntities} from './datastore';

const getMerchant = async (merchantId: number): Promise<MerchantResponse> =>
  getEntity(MERCHANT_KIND, merchantId);

const getAllMerchants = async (
  filters?: Filter[]
): Promise<MerchantResponse[]> => getAllEntities(MERCHANT_KIND, filters);

const addMerchant = async (
  merchant: MerchantPayload
): Promise<MerchantResponse> => {
  const uniqueFirebaseUid = {
    property: 'firebaseUid',
    value: merchant.firebaseUid,
  };
  const merchantId = await addEntity(MERCHANT_KIND, merchant, [
    uniqueFirebaseUid,
  ]);
  return getMerchant(merchantId);
};

export default {addMerchant, getMerchant, getAllMerchants};
