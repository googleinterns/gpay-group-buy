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

import {
  GENERIC_ERROR,
  NO_MERCHANT_WITH_FIREBASE_UID,
} from 'constants/errors/server-errors';

import {
  Customer,
  Listing,
  CustomerPayload,
  MerchantPayload,
  MerchantResponse,
  Filter,
} from 'interfaces';

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
 * Logs in a customer or registers a new one if it is a new user.
 * @param customerData Data of the customer to login/register
 * @param idToken Authentication token of customer
 */
export const loginCustomer = async (
  customerData: CustomerPayload,
  idToken: string
): Promise<Customer> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  };
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/customers`,
    requestOptions
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
 * Retrieves all merchants from the database.
 * @param filters Filters used to restrict merchants retrieved
 */
const getAllMerchants = async (
  filters?: Filter[]
): Promise<MerchantResponse[]> => {
  let queryString;
  if (filters) {
    queryString = filters
      .map(({property, value}) => `${property}=${value}`)
      .join('&');
  }

  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/merchants?${queryString}`
  );

  if (res.status !== 200) {
    throw new Error(GENERIC_ERROR);
  }

  return res.json();
};

/**
 * Retrieves merchant with the given Firebase UID from the database.
 */
export const getMerchantWithFirebaseUid = async (
  firebaseUid: string
): Promise<MerchantResponse> => {
  const merchants = await getAllMerchants([
    {
      property: 'firebaseUid',
      value: firebaseUid,
    },
  ]);

  if (merchants.length === 0) {
    throw new Error(NO_MERCHANT_WITH_FIREBASE_UID);
  }

  return merchants[0];
};

/**
 * Stores new merchant into the database.
 */
export const addMerchant = async (
  merchantPayload: MerchantPayload,
  idToken: string
): Promise<MerchantResponse> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchantPayload),
  };
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/merchants`,
    requestOptions
  );

  if (res.status !== 201) {
    throw new Error(GENERIC_ERROR);
  }

  const merchant = res.json();
  return merchant;
};
