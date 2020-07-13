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

export interface Image {
  url: string;
  alt?: string;
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
 * Listing Interface that contains the fields of a Lisiting,
 */
export interface Listing {
  id: number;
  merchantId: number;
  name: string;
  price: Money;
  oldPrice: Money;
  imgUrl: string;
  description: string;
  deadline: string; // RFC 3339 string
  minCommits: number;
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus: ListingStatus;
}

/**
 * CustomerPayload Interface that contains the fields of the payload that
 * would be sent to the server.
 */
export interface CustomerPayload {
  gpayId: string;
  contactNumber?: string; // E164 format
  address?: string;
}

/**
 * Customer Interface that contains the fields of a Customer.
 */
export interface Customer extends Required<CustomerPayload> {
  id: number;
  numOngoingCommits: number;
}

/**
 * MerchantPayload Interface that contains the fields of the payload that
 * would be sent to the server to add the merchant to the database.
 */
export interface MerchantPayload {
  name: string;
  email: string;
  vpa: string;
  firebaseUid: string;
}

/**
 * MerchantResponse Interface that contains the fields of the merchant object that
 * client side would receive after sending an API request to /merchants endpoint.
 */
export interface MerchantResponse extends MerchantPayload {
  id: number;
}
