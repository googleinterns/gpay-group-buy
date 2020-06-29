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

import {CustomerResponse, CustomerPayload} from '../interfaces';
import {customerStorage} from '../storage';
import { DEFAULT_CUSTOMER_PAYLOAD } from '../constants/default-payload';

const getCustomer = async (customerId: number): Promise<CustomerResponse> =>
  await customerStorage.getCustomer(customerId);

/**
 * Signs up a customer if the customer is not already registered, and returns customer information.
 * @param customer Data of the customer to be added
 */
const signUpCustomer = async (customer: CustomerPayload): Promise<CustomerResponse> => {
  const customerId = await customerStorage.addCustomer({
    ...DEFAULT_CUSTOMER_PAYLOAD,
    ...customer
  });
  return getCustomer(customerId);
}

export default {getCustomer, signUpCustomer};
