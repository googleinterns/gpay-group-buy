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
 */
export interface Money {
  currency: string; // The 3-letter currency code defined in ISO 4217
  dollars: number;
  cents: number;
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
  deadline: Date;
  minCommits: number;
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus: ListingStatus;
}
