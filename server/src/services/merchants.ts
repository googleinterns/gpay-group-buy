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

import {Filter, MerchantPayload, MerchantResponse} from '../interfaces';
import {merchantStorage} from '../storage';

const addMerchant = async (
  merchant: MerchantPayload
): Promise<MerchantResponse> => merchantStorage.addMerchant(merchant);

const getAllMerchants = async (
  filters?: Filter[]
): Promise<MerchantResponse[]> => merchantStorage.getAllMerchants(filters);
// TODO(#87): Add restriction such that the merchants themselves can get all the
// fields but other merchants/customers can get only public fields like name.

export default {addMerchant, getAllMerchants};
