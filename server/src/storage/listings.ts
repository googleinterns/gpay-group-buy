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
  Filter,
  ListingPayload,
  ListingResponse,
  ListingUpdatePayload,
  OrderRule,
} from 'interfaces';

import {LISTING_KIND, COMMIT_KIND} from '../constants/kinds';
import {
  addEntity,
  getAllEntities,
  getAllEntitiesWithIds,
  getEntity,
  makeTransaction,
  updateEntityInTransaction,
} from './datastore';
import {UpdateRule} from './interfaces';

const addListing = async (
  listing: ListingPayload
): Promise<ListingResponse> => {
  const listingId = await addEntity(LISTING_KIND, listing);
  return getListing(listingId);
};

const defaultOrderRule = {
  property: 'deadline',
};

const getAllListings = async (
  filters?: Filter[],
  orderRules: OrderRule[] = [defaultOrderRule]
): Promise<ListingResponse[]> =>
  getAllEntities(LISTING_KIND, filters, orderRules);

const getAllListingsWithIds = async (
  listingIds: number[]
): Promise<ListingResponse[]> =>
  getAllEntitiesWithIds(LISTING_KIND, listingIds);

const getListing = async (listingId: number): Promise<ListingResponse> =>
  getEntity(LISTING_KIND, listingId);

/**
 * Updates a listing with the specified id according to the update rules.
 * Returns the updated listing data.
 * Throws an error if update is not successful.
 * @param listingId Id of the listing to be updated
 * @param fieldsToUpdate Fields of the listing to be updated
 * @param affectedListingId Id of the listing that might be affected
 */
const updateListing = async (
  listingId: number,
  fieldsToUpdate: ListingUpdatePayload,
  affectedCommitIds: number[]
): Promise<ListingResponse> => {
  const listingUpdateRules: UpdateRule[] = Object.keys(fieldsToUpdate).map(
    field => ({
      property: field,
      op: 'replace',
      value: fieldsToUpdate[field as keyof ListingUpdatePayload],
    })
  );

  const commitUpdateRules: UpdateRule[] = [];
  if (
    fieldsToUpdate.listingStatus === 'successful' ||
    fieldsToUpdate.listingStatus === 'unsuccessful'
  ) {
    commitUpdateRules.push({
      property: 'commitStatus',
      value: fieldsToUpdate.listingStatus,
    });
  }

  await makeTransaction(
    updateEntityInTransaction(LISTING_KIND, listingId, listingUpdateRules),
    ...affectedCommitIds.map(commitId =>
      updateEntityInTransaction(COMMIT_KIND, commitId, commitUpdateRules)
    )
  );
  return getListing(listingId);
};

export default {
  addListing,
  getAllListings,
  getAllListingsWithIds,
  getListing,
  updateListing,
};
