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

import {Filter, ListingPayload, ListingResponse, OrderRule} from 'interfaces';

import {LISTING_KIND} from '../constants/kinds';
import {add, getAll, getAllWithIds, get} from './datastore';

const addListing = async (
  listing: ListingPayload
): Promise<ListingResponse> => {
  const listingId = await add(LISTING_KIND, listing);
  return getListing(listingId);
};

const defaultOrderRule = {
  property: 'deadline',
};

const getAllListings = async (
  filters?: Filter[],
  orderRules: OrderRule[] = [defaultOrderRule]
): Promise<ListingResponse[]> => getAll(LISTING_KIND, filters, orderRules);

const getAllListingsWithIds = async (
  listingIds: number[]
): Promise<ListingResponse[]> => getAllWithIds(LISTING_KIND, listingIds);

const getListing = async (listingId: number): Promise<ListingResponse> =>
  get(LISTING_KIND, listingId);

export default {addListing, getAllListings, getAllListingsWithIds, getListing};
