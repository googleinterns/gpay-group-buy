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

import {DEFAULT_CUSTOMER_PAYLOAD} from '../constants/default-payload';
import {
  CustomerResponse,
  CustomerPayload,
  CustomerPayloadKey,
} from '../interfaces';
import {customerStorage} from '../storage';

const getCustomer = async (customerId: number): Promise<CustomerResponse> =>
  customerStorage.getCustomer(customerId);

/**
 * Gets a customer by identifying them with their gpayId.
 * Returns a CustomerResponse object when such a customer exits.
 * Returns null otherwise.
 * @param gpayId The gpay id of the customer to retrieve
 */
const getCustomerWithGpayId = async (
  gpayId: string
): Promise<CustomerResponse | null> =>
  customerStorage.getCustomerWithGpayId(gpayId);

/**
 * Creates a customer if the customer is not already registered, and returns customer information.
 * Else, an error would be thrown.
 * @param customer Data of the customer to be added
 */
const addCustomer = async (
  customer: CustomerPayload
): Promise<CustomerResponse> =>
  customerStorage.addCustomer({
    ...DEFAULT_CUSTOMER_PAYLOAD,
    ...customer,
  });

/**
 * Updates a customer with the specified customerId by modifying the fields in fieldsToUpdate.
 * Throws an error if fieldsToUpdate contains fields that are not allowed to be modified,
 * or if the customer does not exist.
 * @param customerId Id of the customer to update
 * @param fieldsToUpdate Fields of the customer to be updated
 */
const updateCustomer = async (
  customerId: number,
  fieldsToUpdate: Partial<CustomerPayload>
) => {
  // Check that request contains only allowed keys
  const allowedKeys: Set<CustomerPayloadKey> = new Set([
    'defaultFulfilmentDetails',
  ]);
  Object.keys(fieldsToUpdate).forEach(key => {
    if (!(allowedKeys as Set<string>).has(key)) {
      throw new Error(`${key} field cannot be modified.`);
    }
  });

  return customerStorage.updateCustomer(customerId, fieldsToUpdate);
};

export default {
  getCustomer,
  getCustomerWithGpayId,
  addCustomer,
  updateCustomer,
};
