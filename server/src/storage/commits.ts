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

import {COMMIT_KIND, LISTING_KIND} from '../constants/kinds';
import {
  Filter,
  CommitResponse,
  CommitPayload,
  CommitEditPayload,
} from '../interfaces';
import {
  getEntity,
  getAllEntities,
  makeTransaction,
  deleteInTransaction,
  updateInTransaction,
  addInTransaction,
} from './datastore';
import {UpdateRule} from './interfaces';

/**
 * Gets a commit with the specified id from datastore.
 * @param commitId The id of the commit to be retrieved
 */
const getCommit = async (commitId: number): Promise<CommitResponse> =>
  getEntity(COMMIT_KIND, commitId);

/**
 * Retrieves all commits satisfying the filters, if provided.
 * @param filters Filters on the get query
 */
const getAllCommits = async (filters?: Filter[]): Promise<CommitResponse[]> =>
  getAllEntities(COMMIT_KIND, filters);

/**
 * Adds a commit with the specified data to datastore.
 * If uniqueProperties is specified, adding will only occur if an existing commit
 * with the same unique properties don't already exist.
 * Returns the added commit if adding is successful.
 * Throws an error if adding is not successful.
 * @param commit Data of the commit to be added
 * @param uniqueProperties The properties that should be unique to the commit
 */
const addCommit = async (
  commit: CommitPayload,
  uniqueProperties?: Filter[]
): Promise<CommitResponse> => {
  const [commitId] = await makeTransaction(
    addInTransaction(COMMIT_KIND, commit, uniqueProperties),
    updateInTransaction(LISTING_KIND, commit.listingId, [
      {
        property: 'numCommits',
        op: 'add',
        value: 1,
      },
    ])
  );
  return getCommit(commitId as number);
};

/**
 * Edits a commit with the specified id according to the edit rules.
 * Returns the edited commit data.
 * Throws an error if edit is not successful.
 * @param commitId Id of the commit to be edited
 * @param fieldsToEdit Fields of the commit to be edited
 * @param affectedListingId Id of the listing that might be affected
 */
const editCommit = async (
  commitId: number,
  fieldsToEdit: CommitEditPayload,
  affectedListingId: number
): Promise<CommitResponse> => {
  const commitEditRules: UpdateRule[] = Object.keys(fieldsToEdit).map(
    field => ({
      property: field,
      op: 'replace',
      value: fieldsToEdit[field as keyof CommitEditPayload],
    })
  );

  const listingUpdateRules: UpdateRule[] = [];
  if (fieldsToEdit.commitStatus === 'paid') {
    listingUpdateRules.push({
      property: 'numPaid',
      op: 'add',
      value: 1,
    });
  }

  await makeTransaction(
    updateInTransaction(COMMIT_KIND, commitId, commitEditRules),
    updateInTransaction(LISTING_KIND, affectedListingId, listingUpdateRules)
  );
  return getCommit(commitId);
};

/**
 * Deletes a commit with the specified id from datastore.
 * Throws an error if deleting is not successful.
 * @param commitId Id of the commit to be deleted
 * @param listingId Id of the listing affected
 */
const deleteCommit = async (commitId: number, listingId: number) =>
  await makeTransaction(
    deleteInTransaction(COMMIT_KIND, commitId),
    updateInTransaction(LISTING_KIND, listingId, [
      {
        property: 'numCommits',
        op: 'subtract',
        value: 1,
      },
    ])
  );

export default {getCommit, getAllCommits, addCommit, editCommit, deleteCommit};
