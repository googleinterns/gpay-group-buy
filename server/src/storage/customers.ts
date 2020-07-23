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
import {get, getAll, add} from './datastore';

/**
 * Gets number of commits used by the specified customer.
 * @param customerId Id of the customer
 */
const getNumUsedCommits = async (customerId: number) => {
  const customerFilter = {
    property: 'customerId',
    value: customerId,
  };

  const ongoingCommits: CommitResponse[] = await getAll(COMMIT_KIND, [
    customerFilter,
    {
      property: 'commitStatus',
      value: 'ongoing',
    },
  ]);
  const succesfulCommits: CommitResponse[] = await getAll(COMMIT_KIND, [
    customerFilter,
    {
      property: 'commitStatus',
      value: 'successful',
    },
  ]);

  return ongoingCommits.length + succesfulCommits.length;
};

const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
  const customer: CustomerDatastoreReponse = await get(
    CUSTOMER_KIND,
    customerId
  );
  const numUsedCommits = await getNumUsedCommits(customerId);
  return {
    ...customer,
    numUsedCommits,
  };
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
  const [customer]: CustomerDatastoreReponse[] = await getAll(CUSTOMER_KIND, [
    {
      property: 'gpayId',
      value: gpayId,
    },
  ]);
  if (customer === undefined) {
    return null;
  }

  const numUsedCommits = await getNumUsedCommits(customer.id);
  return {
    ...customer,
    numUsedCommits,
  };
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
  const customerId = await add(CUSTOMER_KIND, customer, [
    {
      property: 'gpayId',
      value: customer.gpayId,
    },
  ]);
  return getCustomer(customerId);
};

export default {addCustomer, getCustomer, getCustomerWithGpayId};
