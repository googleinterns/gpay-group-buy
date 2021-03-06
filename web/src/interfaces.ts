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

/**
 * A generic decoded JWT from the microapps API.
 * Note that this is not exhaustive and only needed fields are typed.
 */
export interface DecodedToken {
  exp: number; // The time the token expires, represented in Unix time (integer seconds)
}

/**
 * A decoded Phone Number Token from the microapps API.
 * Note that this is not exhaustive and only needed fields are typed.
 * For the exhaustive list,
 * refer to: https://developers.google.com/pay/spot/eap/reference/phonenumber-api
 */
export interface DecodedPhoneNumberToken extends DecodedToken {
  // contactNumber format is E.123 international notation
  // Note that the national phone number portion will only contain digits (no spaces)
  // Eg: +91 1234567890
  phone_number: string;
}

/**
 * A decoded Identity Token from the microapps API.
 * Note that this is not exhaustive and only needed fields are typed.
 * For the exhaustive list,
 * refer to: https://developers.google.com/pay/spot/eap/reference/identity-api
 */
export interface DecodedIdentityToken extends DecodedToken {
  sub: string; // Unique identifier for a user in GPay
  name: string;
}

/**
 * CustomerIdentity object that contains the customer identity token and its decoded form.
 */
export interface CustomerIdentity {
  idToken: string;
  decodedToken: DecodedIdentityToken;
}

/**
 * NonEmptyArray type enforces at least 1 element of type T in the array.
 */
export type NonEmptyArray<T> = [T, ...T[]];

export interface Image {
  url: string;
  alt?: string;
}

/**
 * FontSize type that provides several preset options for a font size.
 */
type FontSize = 'small' | 'medium' | 'large';

/**
 * CommitProgressFontSize type that provides several preset options for the font
 * size of CommitProgress. It allows 3 values: 'small', 'medium' and 'large';
 */
export type CommitProgressFontSize = FontSize;

/**
 * DeadlineFontSize type that provides several preset options for the font size
 * of DeadlineTag. It allows 2 values: 'small' and 'medium';
 */
export type DeadlineFontSize = Omit<FontSize, 'large'>;

/**
 * PriceFontSize type that provides several preset options for the font size of
 * ListingPrice. It allows 2 values: 'medium' and 'large';
 */
export type PriceFontSize = Omit<FontSize, 'small'>;

/**
 * FulfilmentDetails Interface that contains the fields of a fulfilment.
 */
export interface FulfilmentDetails {
  name: string;
  address: string;
  // contactNumber format is E.123 international notation
  // Note that the national phone number portion will only contain digits (no spaces)
  // Eg: +91 1234567890
  contactNumber: string;
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
 * Interface that contains the fields of Listing that are provided by the user through
 * the Add Listing Form.
 */
export interface AddListingFormData {
  name: string;
  currency: string; // The 3-letter currency code defined in ISO 4217
  price: number;
  oldPrice: number;
  imgUrl: string;
  description: string;
  deadline: string; // RFC 3339 string
  minCommits: number;
}

/**
 * ListingPayload Interface that contains the fields of the payload that
 * would be sent to the server.
 */
export interface ListingPayload {
  merchantId: number;
  name: string;
  price: Money;
  oldPrice: Money;
  imgUrl: string;
  description: string;
  deadline: string; // RFC 3339 string
  minCommits: number;
}

/**
 * Listing Interface that contains the fields of a Listing,
 */
export interface Listing extends ListingPayload {
  id: number;
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus: ListingStatus;
}

/**
 * ListingQueryParams Interface that contains the possible query parameters
 * for Listings.
 */
export interface ListingQueryParams extends Listing {
  ids: string;
}

/**
 * ListingQuery Interface that contains the fields of the query that
 * would be sent to the server to query for listings.
 */
export type ListingQuery = Partial<ListingQueryParams>;

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
 * CommitPayload Interface that contains the fields of the payload that
 * would be sent to the server to create commits.
 */
export interface CommitPayload {
  customerId: number;
  listingId: number;
}

/**
 * CommitPaymentPayload Interface that contains the fields of the payload that
 * would be sent to the server to pay for commits.
 */
export interface CommitPaymentPayload {
  fulfilmentDetails: FulfilmentDetails;
}

/**
 * CommitQuery Interface that contains the fields of the query that
 * would be sent to the server to query for commits.
 */
export type CommitQuery = Partial<
  Pick<Commit, 'customerId' | 'listingId' | 'commitStatus'>
>;

/**
 * Commit Interface that contains the fields of a Commit.
 */
export interface Commit extends CommitPayload, CommitPaymentPayload {
  id: number;
  createdAt: Date;
  commitStatus: CommitStatus;
}

/**
 * GroupedCommits type of commits grouped by their commit status.
 */
export type GroupedCommits = {
  [key in CommitStatus]?: Commit[];
};

/**
 * CustomerPayload Interface that contains the fields of the payload that
 * would be sent to the server.
 */
export interface CustomerPayload {
  gpayId: string;
  defaultFulfilmentDetails?: FulfilmentDetails;
  // gpayContactNumber format is E.123 international notation
  // Note that the national phone number portion will only contain digits (no spaces)
  // Eg: +91 1234567890
  gpayContactNumber: string;
}

/**
 * Customer Interface that contains the fields of a Customer.
 */
export interface Customer extends Required<CustomerPayload> {
  id: number;
  numUsedCommits: number;
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
