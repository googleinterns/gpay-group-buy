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

import {DEFAULT_LISTING_PAYLOAD} from '../constants/default-payload';
import {Filter, ListingRequest, ListingResponse} from '../interfaces';
import {commitStorage, listingStorage} from '../storage';

const addListing = async (listing: ListingRequest): Promise<ListingResponse> =>
  listingStorage.addListing({
    ...listing,
    ...DEFAULT_LISTING_PAYLOAD,
  });

const getAllListings = async (filters?: Filter[]): Promise<ListingResponse[]> =>
  listingStorage.getAllListings(filters);

const getAllListingsWithIds = async (
  listingIds: number[]
): Promise<ListingResponse[]> =>
  listingStorage.getAllListingsWithIds(listingIds);

const getListing = async (listingId: number): Promise<ListingResponse> =>
  listingStorage.getListing(listingId);

const updateListingOutcomeStatus = async (listing: ListingResponse) => {
  const isSuccessful = listing.numCommits >= listing.minCommits;
  const affectedCommits = await commitStorage.getAllCommits([
    {property: 'listingId', value: listing.id},
  ]);
  return listingStorage.updateListing(
    listing.id,
    {listingStatus: isSuccessful ? 'successful' : 'unsuccessful'},
    affectedCommits.map(commit => commit.id)
  );
};

const updateOutdatedListingOutcomeStatuses = async (): Promise<
  ListingResponse[]
> => {
  const now = new Date();
  const pastDeadlineFilter: Filter = {
    property: 'deadline',
    op: '<',
    value: now,
  };
  const ongoingStatusFilter: Filter = {
    property: 'listingStatus',
    value: 'ongoing',
  };
  const listingsToUpdate = await listingStorage.getAllListings([
    pastDeadlineFilter,
    ongoingStatusFilter,
  ]);
  return Promise.all(listingsToUpdate.map(updateListingOutcomeStatus));
};

export default {
  addListing,
  getAllListings,
  getAllListingsWithIds,
  getListing,
  updateOutdatedListingOutcomeStatuses,
};
