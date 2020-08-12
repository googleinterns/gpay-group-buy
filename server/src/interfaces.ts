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

import {Operator} from '@google-cloud/datastore/build/src/query';

/**
 * CustomerPayload Interface that contains the fields of the payload that
 * would be sent to create a Customer Entity.
 */
export interface CustomerPayload {
  gpayId: string;
  defaultFulfilmentDetails: FulfilmentDetails;
}

/**
 * Union type of the keys of CustomerPayload.
 */
export type CustomerPayloadKey = keyof CustomerPayload;

/**
 * CustomerDatastoreReponse Interface that contains the fields of the Response that
 * server side receives from the Datastore.
 */
export interface CustomerDatastoreReponse extends Required<CustomerPayload> {
  id: number;
}

/**
 * CustomerResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface CustomerResponse extends CustomerDatastoreReponse {
  numUsedCommits: number;
}

/**
 * CommitStatus type contains the different states of a Commit.
 */
export type CommitStatus =
  | 'ongoing'
  | 'successful'
  | 'paid'
  | 'completed'
  | 'unsuccessful';

/**
 * CommitComputedProperties Interface that contains the fields of a Commit
 * that are computed by the server.
 */
export interface CommitComputedProperties {
  createdAt: Date;
  commitStatus: CommitStatus;
}

/**
 * CommitRequest Interface that contains the fields that will be provided
 * by the client in the request body to create a Commit.
 */
export interface CommitRequest {
  customerId: number;
  listingId: number;
}

/**
 * FulfilmentDetails Interface that contains the fields of a fulfilment.
 */
interface FulfilmentDetails {
  name: string;
  address: string;
  contactNumber: string; // E164 format
}

/**
 * CommitPaymentRequest Interface that contains the fields that will be provided
 * by the client in the request body.
 */
export interface CommitPaymentRequest {
  fulfilmentDetails: FulfilmentDetails;
}

/**
 * CommitPayload Interface that contains the fields of the payload that
 * would be sent to create a Commit Entity.
 */
export interface CommitPayload
  extends CommitComputedProperties,
    CommitRequest,
    CommitPaymentRequest {}

/**
 * Union type of the keys of CommitPayload.
 */
export type CommitPayloadKey = keyof CommitPayload;

/**
 * CommitUpdatePayload Interface that contains the fields of the payload that
 * would be sent to update a Commit Entity.
 */
export type CommitUpdatePayload = Partial<CommitPayload>;

/**
 * CommitResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface CommitResponse extends CommitPayload {
  id: number;
}

/**
 * Money Interface that represents an amount of money with its currency type.
 * Value = dollars + (cents / 100)
 */
export interface Money {
  currency: string; // The 3-letter currency code defined in ISO 4217
  dollars: number;
  cents: number; // A value of the range 0~99
}

/**
 * ListingStatus type contains the different states of a Listing.
 */
export type ListingStatus =
  | 'ongoing'
  | 'successful'
  | 'completed'
  | 'unsuccessful';

/**
 * ListingComputedProperties Interface that contains the fields of a Listing that
 * are not provided by the client, but computed by the server.
 */
export interface ListingComputedProperties {
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus: ListingStatus;
}

/**
 * ListingRequest Interface that contains the fields that must be provided by the
 * client in the POST/PUT request body.
 */
export interface ListingRequest {
  merchantId: number;
  name: string;
  price: Money;
  oldPrice: Money;
  imgUrl: string;
  description: string;
  deadline: Date;
  minCommits: number;
}

/**
 * ListingPayload Interface that contains the fields of the payload that
 * would be sent to create a Listing Entity.
 */
export interface ListingPayload
  extends ListingRequest,
    ListingComputedProperties {}

/**
 * ListingUpdatePayload Interface that contains the fields of the payload that
 * would be sent to update a Listing Entity.
 */
export type ListingUpdatePayload = Partial<ListingPayload>;

/**
 * ListingResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface ListingResponse extends ListingPayload {
  id: number;
}

/**
 * MerchantPayload Interface that contains the fields of the payload that
 * would be sent to create a Merchant Entity.
 */
export interface MerchantPayload {
  name: string;
  email: string;
  vpa: string;
  firebaseUid: string;
}

/**
 * MerchantResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface MerchantResponse extends MerchantPayload {
  id: number;
}

/**
 * Filter Interface that contains the fields of a filter query.
 */
export interface Filter {
  property: string;
  value: any;
  op?: Operator;
}

/**
 * OrderRule Interface that contains order rules for sorting.
 */
export interface OrderRule {
  property: string;
  descending?: boolean;
}

/**
 * A generic string key object.
 */
export interface StringKeyObject {
  [key: string]: any;
}
