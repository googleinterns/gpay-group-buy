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
 * CustomerPayload Interface that contains the fields of the payload that
 * would be sent to create a Customer Entity.
 */
export interface CustomerPayload {
  gpayId: string;
  contactNumber: string;
  address: string;
}

/**
 * CustomerResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface CustomerResponse extends CustomerPayload {
  id: number;
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
 * ListingPayload Interface that contains the fields of the payload that
 * would be sent to create a Listing Entity.
 */
export interface ListingPayload {
  merchantId: number;
  name: string;
  price: string;
  oldPrice: string;
  currency: string;
  imgUrl: string;
  description: string;
  deadline: Date;
  minCommits: number;
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus: ListingStatus;
}

/**
 * ListingResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface ListingResponse extends ListingPayload {
  id: number;
}
