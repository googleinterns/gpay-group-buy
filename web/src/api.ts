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
  EXCEEDED_MAX_COMMITS,
} from 'constants/errors/server-errors';
import {CONFLICT_ERROR_CODE} from 'constants/errors/status-codes';

import {
  Commit,
  CommitPayload,
  CommitQuery,
  Customer,
  CustomerPayload,
  Listing,
  ListingPayload,
  MerchantPayload,
  MerchantResponse,
  ListingQuery,
  CommitPaymentPayload,
} from 'interfaces';
import {ConflictError} from 'utils/errors';
import {MaxCommitsExceededError} from 'utils/errors/commits';

/**
 * Helper function that wraps the fetch call to make a post request with Auth headers.
 * @param endpoint Endpoint of the request
 * @param data Request body data
 * @param token Auth token
 */
const postWithAuth = async (
  endpoint: string,
  data: object,
  token: string
): Promise<Response> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(endpoint, requestOptions);
};

/**
 * Helper function that wraps the fetch call to make a patch request with Auth headers.
 * @param endpoint Endpoint of the request
 * @param data Request body data
 * @param token Auth token
 */
const patchWithAuth = async (
  endpoint: string,
  data: object,
  token: string
): Promise<Response> => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(endpoint, requestOptions);
};

/**
 * Helper method that wraps the fetch call to make a delete request with Auth headers.
 * @param endpoint Endpoint of the request
 * @param token Auth token
 */
const deleteWithAuth = async (endpoint: string, token: string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(endpoint, requestOptions);
};

/**
 * Helper method that wraps the fetch call to make a get request with query params.
 * @param endpoint Endpoint of the request
 * @param queryParams Query params of the request
 */
const query = async (
  endpoint: string,
  queryParams: Record<string, unknown>
): Promise<Response> => {
  const strParams: Record<string, string> = {};
  Object.keys(queryParams).forEach(
    key => (strParams[key] = String(queryParams[key]))
  );

  const url = new URL(endpoint);
  const params = new URLSearchParams(strParams).toString();
  url.search = params;

  return fetch(url.toString());
};

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
  const res = await postWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/customers`,
    customerData,
    idToken
  );

  return res.json();
};

/**
 * Updates the specified fields of a customer with the specified customerId.
 * @param customerId Id of the customer to be updated
 * @param fieldsToUpdate Data that we want to update
 * @param idToken Authentication token of customer
 */
export const updateCustomer = async (
  customerId: number,
  fieldsToUpdate: Partial<CustomerPayload>,
  idToken: string
): Promise<Customer> => {
  const res = await patchWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/customers/${customerId}`,
    fieldsToUpdate,
    idToken
  );

  return res.json();
};

/**
 * Adds a new listing with the specified listingData.
 * @param listingData Data of the listing to add
 * @param idToken Authentication token of customer
 */
export const addListing = async (
  listingData: ListingPayload,
  idToken: string
): Promise<Listing> => {
  const res = await postWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/listings/`,
    listingData,
    idToken
  );
  return res.json();
};

/**
 * Fetches all Listings.
 * @param queryParams Query parameters used to filter listings to retrieve.
 */
export const getAllListings = async (
  queryParams?: ListingQuery
): Promise<Listing[]> => {
  const endpoint = `${process.env.REACT_APP_SERVER_URL}/listings`;
  const res = queryParams
    ? await query(endpoint, queryParams)
    : await fetch(endpoint);

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
 * Gets commits that satisfy the query.
 * @param commitQuery Query params of the request
 */
export const getCommits = async (
  commitQuery: CommitQuery
): Promise<Commit[]> => {
  const res = await query(
    `${process.env.REACT_APP_SERVER_URL}/commits/`,
    commitQuery
  );
  return res.json();
};

/**
 * Adds a new commit with the specified commitData.
 * @param commitData Data of the commit to add
 * @param idToken Authentication token of customer
 */
export const addCommit = async (
  commitData: CommitPayload,
  idToken: string
): Promise<Commit> => {
  const res = await postWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/commits/`,
    commitData,
    idToken
  );

  const resData = await res.json();

  if (!res.ok) {
    const errMsg = resData.error?.message;
    if (res.status === CONFLICT_ERROR_CODE) {
      throw new ConflictError(errMsg);
    } else if (errMsg === EXCEEDED_MAX_COMMITS) {
      throw new MaxCommitsExceededError(errMsg);
    } else {
      throw new Error(errMsg);
    }
  }
  return resData;
};

/**
 * Deletes a commit with the specified commitId.
 * @param commitId Id of the commit to delete
 * @param idToken Authentication token of customer
 */
export const deleteCommit = async (commitId: number, idToken: string) => {
  const res = await deleteWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/commits/${commitId}`,
    idToken
  );

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(resData.error?.message);
  }
  return;
};

/**
 * Pays for a commit with the specified commitId.
 * @param commitId Id of the commit to pay for
 * @param paymentData Payment data for the commit
 * @param idToken Authentication token of customer
 */
export const payForCommit = async (
  commitId: number,
  paymentData: CommitPaymentPayload,
  idToken: string
): Promise<Commit> => {
  const res = await postWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/commits/${commitId}/pay`,
    paymentData,
    idToken
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.error?.message);
  }
  return resData;
};

/**
 * Completes the commit with the specified commitId.
 * @param commitId Id of the commit to complete
 */
export const completeCommit = async (commitId: number) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/commits/${commitId}/complete`,
    {method: 'POST'}
  );
  return res.json();
};

/**
 * Retrieves all merchants from the database.
 * @param queryParams Query parameters used to filter merchants to retrieve
 */
const getAllMerchants = async (queryParams?: {
  [key: string]: string;
}): Promise<MerchantResponse[]> => {
  const endpoint = `${process.env.REACT_APP_SERVER_URL}/merchants`;
  const res = queryParams
    ? await query(endpoint, queryParams)
    : await fetch(endpoint);

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
  const merchants = await getAllMerchants({
    firebaseUid,
  });

  if (merchants.length === 0) {
    throw new Error(`${NO_MERCHANT_WITH_FIREBASE_UID} ${firebaseUid}.`);
  }

  return merchants[0];
};

/**
 * Retrieves merchant with the specified merchantId.
 * @param merchantId Id of the merchant to retrieve
 */
export const getMerchantWithId = async (
  merchantId: number
): Promise<MerchantResponse> => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/merchants/${merchantId}`
  );
  return res.json();
};

/**
 * Stores new merchant into the database.
 */
export const addMerchant = async (
  merchantPayload: MerchantPayload,
  idToken: string
): Promise<MerchantResponse> => {
  const res = await postWithAuth(
    `${process.env.REACT_APP_SERVER_URL}/merchants`,
    merchantPayload,
    idToken
  );

  if (res.status !== 201) {
    throw new Error(GENERIC_ERROR);
  }

  const merchant = res.json();
  return merchant;
};
