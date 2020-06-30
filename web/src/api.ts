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

import Errors from 'constants/sign-up-errors';

import {Customer, MerchantPayload} from 'interfaces';

/**
 * Fetches a particular customer with the specified customerId.
 */
export const getCustomer = async (customerId: number): Promise<Customer> => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}`
  );
  return res.json();
};

/**
 * Stores new merchant into the database.
 */
export const addMerchant = async (
  merchant: MerchantPayload,
  idToken: string
): Promise<number> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchant),
  };
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/merchants`,
    requestOptions
  );

  if (res.status !== 201) {
    throw new Error(Errors.SERVER_ERROR);
  }

  const location = res.headers.get('Location');
  const merchantId = location?.substring(location?.lastIndexOf('/') + 1);
  if (!merchantId) throw new Error(Errors.SERVER_ERROR);

  return Number(merchantId);
};
