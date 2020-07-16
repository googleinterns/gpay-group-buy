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
import {Filter, CommitResponse, CommitPayload} from '../interfaces';
import {
  get,
  getAll,
  addAndUpdateRelatedEntity,
  deleteAndUpdateRelatedEntity,
} from './datastore';

/**
 * Gets a commit with the specified id from datastore.
 * @param commitId The id of the commit to be retrieved
 */
const getCommit = async (commitId: number): Promise<CommitResponse> =>
  get(COMMIT_KIND, commitId);

/**
 * Retrieves all commits satisfying the filters, if provided.
 * @param filters Filters on the get query
 */
const getAllCommits = async (filters?: Filter[]): Promise<CommitResponse[]> =>
  getAll(COMMIT_KIND, filters);

/**
 * Adds a unique commit with the specified data to datastore.
 * Returns the added commit if adding is successful.
 * Throws an error if adding is not successful.
 * @param commit Data of the commit to be added
 * @param uniqueProperties The properties that should be unique to the commit
 */
const addCommit = async (commit: CommitPayload, uniqueProperties?: Filter[]): Promise<CommitResponse> => {
  const commitId = await addAndUpdateRelatedEntity(
    COMMIT_KIND,
    commit,
    LISTING_KIND,
    commit.listingId,
    [
      {
        property: 'numCommits',
        op: 'add',
        value: 1,
      },
    ],
    uniqueProperties,
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
  await deleteAndUpdateRelatedEntity(
    COMMIT_KIND,
    commitId,
    LISTING_KIND,
    listingId,
    [
      {
        property: 'numCommits',
        op: 'subtract',
        value: 1,
      },
    ]
  );

export default {getCommit, getAllCommits, addCommit, deleteCommit};
