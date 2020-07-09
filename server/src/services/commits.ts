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

import {MAX_NUM_COMMITS} from '../constants/customer';
import {DEFAULT_COMMIT_PAYLOAD} from '../constants/default-payload';
import {
  Filter,
  CommitResponse,
  StringKeyObject,
  CommitPayloadKey,
} from '../interfaces';
import {commitStorage} from '../storage';

/**
 * Retrieves all commits.
 * If query paramaters are provided, will retrieve all commits satisfying
 * the query parameters.
 * @param queryParams The query parameters
 */
const getAllCommits = async (
  queryParams: StringKeyObject
): Promise<CommitResponse[]> => {
  const allowedKeys: Set<CommitPayloadKey> = new Set([
    'customerId',
    'listingId',
  ]);
  const filters: Filter[] = [];
  Object.keys(queryParams).forEach(key => {
    if (!(allowedKeys as Set<string>).has(key)) {
      throw new Error(`${key} is not a valid query parameter.`);
    }

    let value = queryParams[key];
    // TODO: Remove this check after we do the parsing in the api layer.
    switch (key) {
      case 'customerId':
      case 'listingId':
        value = Number(value);
        if (Number.isNaN(value)) {
          throw new Error(`Invalid filter value provided for ${key}.`);
        }
        break;
    }

    filters.push({
      property: key,
      value,
    });
  });
  return commitStorage.getAllCommits(filters);
};

/**
 * Creates a new commit for the customer and the listing.
 * An error would be thrown if the customer has reached their max num of ongoing commits,
 * or if commit data provided is not valid.
 * @param commitData Data of the commit to be added
 */
const addCommit = async (
  commitData: CommitRequest
): Promise<CommitResponse> => {
  const customerCommits = await commitStorage.getAllCommits([
    {
      property: 'customerId',
      value: commitData.customerId,
    },
    {
      property: 'commitStatus',
      value: 'ongoing',
    },
  ]);

  if (customerCommits.length >= MAX_NUM_COMMITS) {
    throw new Error('Customer has reached max number of ongoing commits.');
  }

  return await commitStorage.addCommit({
    ...DEFAULT_COMMIT_PAYLOAD,
    ...commitData,
    createdAt: new Date(),
  });
};

export default {getAllCommits, addCommit};
