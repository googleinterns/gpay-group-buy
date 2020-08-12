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

import {CUSTOMER_KIND, COMMIT_KIND} from '../constants/kinds';
import {
  CustomerResponse,
  CommitResponse,
  CustomerPayload,
  CustomerDatastoreReponse,
} from '../interfaces';
import {getEntity, getAllEntities, addEntity, updateEntity} from './datastore';
import {UpdateRule} from './interfaces';

/**
 * Gets number of commits used by the specified customer and
 * returns a CustomerResponse containing numUsedCommits.
 * @param customer Existing data of the customer from datastore
 */
const withNumUsedCommits = async (
  customer: CustomerDatastoreReponse
): Promise<CustomerResponse> => {
  const customerFilter = {
    property: 'customerId',
    value: customer.id,
  };

  const ongoingCommits: CommitResponse[] = await getAllEntities(COMMIT_KIND, [
    customerFilter,
    {
      property: 'commitStatus',
      value: 'ongoing',
    },
  ]);
  const succesfulCommits: CommitResponse[] = await getAllEntities(COMMIT_KIND, [
    customerFilter,
    {
      property: 'commitStatus',
      value: 'successful',
    },
  ]);

  const numUsedCommits = ongoingCommits.length + succesfulCommits.length;

  return {
    ...customer,
    numUsedCommits,
  };
};

const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
  const customer: CustomerDatastoreReponse = await getEntity(
    CUSTOMER_KIND,
    customerId
  );
  return withNumUsedCommits(customer);
};

/**
 * Gets a customer with the specified gpayId.
 * Returns a CustomerResponse object when such a customer exits.
 * Returns null otherwise.
 * @param gpayId The gpay id of the customer to retrieve
 */
const getCustomerWithGpayId = async (
  gpayId: string
): Promise<CustomerResponse | null> => {
  const [customer]: CustomerDatastoreReponse[] = await getAllEntities(
    CUSTOMER_KIND,
    [
      {
        property: 'gpayId',
        value: gpayId,
      },
    ]
  );
  if (customer === undefined) {
    return null;
  }

  return withNumUsedCommits(customer);
};

/**
 * Adds a customer with the specified data to datastore.
 * Returns the added customer if adding is successful.
 * Throws an error if adding is not successful.
 * @param customer Data of the customer to be added
 */
const addCustomer = async (
  customer: CustomerPayload
): Promise<CustomerResponse> => {
  const customerId = await addEntity(CUSTOMER_KIND, customer, [
    {
      property: 'gpayId',
      value: customer.gpayId,
    },
  ]);
  return getCustomer(customerId);
};

/**
 * Updates a customer with the specified customerId with the fieldsToUpdate.
 * Returns the updated customer if update is successful.
 * Throws an error otherwise.
 * @param customerId
 * @param fieldsToUpdate
 */
const updateCustomer = async (
  customerId: number,
  fieldsToUpdate: Partial<CustomerPayload>
): Promise<CustomerResponse> => {
  const customerUpdateRules: UpdateRule[] = Object.keys(fieldsToUpdate).map(
    field => ({
      property: field,
      op: 'replace',
      value: fieldsToUpdate[field as keyof CustomerPayload],
    })
  );
  await updateEntity(CUSTOMER_KIND, customerId, customerUpdateRules);
  return getCustomer(customerId);
};

export default {
  addCustomer,
  getCustomer,
  getCustomerWithGpayId,
  updateCustomer,
};
