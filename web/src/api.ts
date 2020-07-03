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

import {SERVER_ERROR} from 'constants/server-error';

import {Customer, Listing, MerchantPayload, MerchantResponse} from 'interfaces';

/**
 * Fetches a particular customer with the specified customerId.
 * @param customerId Id of the customer to retrieve
 */
export const getCustomer = async (customerId: number): Promise<Customer> => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/customers/${customerId}`
  );
  return res.json();
};

/**
 * Fetches all Listings.
 */
export const getAllListings = async (): Promise<Listing[]> => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/listings`);
  return res.json();
};

/**
 * Fetches a particular listing with the specified listingId.
 * @param listingId Id of the listing to retrieve
 */
export const getListing = async (listingId: number): Promise<Listing> => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/listings/${listingId}`
  );
  return res.json();
};

/**
 * Retrieves merchant with the given email from the database.
 */
export const getMerchantWithEmail = async (
  email: string,
  idToken: string
): Promise<MerchantResponse> => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/merchants?email=${email}`,
    requestOptions
  );

  if (res.status !== 200) {
    throw new Error(SERVER_ERROR);
  }

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
    throw new Error(SERVER_ERROR);
  }

  const location = res.headers.get('Location');
  const merchantId = location?.substring(location?.lastIndexOf('/') + 1);
  if (!merchantId) throw new Error(SERVER_ERROR);

  return Number(merchantId);
};
