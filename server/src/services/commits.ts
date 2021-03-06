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
  CommitRequest,
  StringKeyObject,
  CommitPayloadKey,
  CommitPaymentRequest,
  CommitUpdatePayload,
} from '../interfaces';
import {commitStorage, listingStorage, customerStorage} from '../storage';
import {BadRequestError, InternalServerError} from '../utils/http-errors';
import {encodeMicroappsUrl, sendMessage} from '../utils/spot-api';

/**
 * Retrieves commit with the specified commitId.
 * @param commitId Id of the commit to retrieve
 */
const getCommit = async (commitId: number) =>
  await commitStorage.getCommit(commitId);

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
    'commitStatus',
  ]);
  const filters: Filter[] = [];
  Object.keys(queryParams).forEach(key => {
    if (!(allowedKeys as Set<string>).has(key)) {
      throw new BadRequestError(`${key} is not a valid query parameter.`);
    }

    let value = queryParams[key];
    // TODO: Remove this check after we do the parsing in the api layer.
    switch (key) {
      case 'customerId':
      case 'listingId':
        value = Number(value);
        if (Number.isNaN(value)) {
          throw new BadRequestError(
            `Invalid filter value provided for ${key}.`
          );
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
  // Check that listing and customer exists
  const listing = await listingStorage.getListing(commitData.listingId);
  const customer = await customerStorage.getCustomer(commitData.customerId);

  // Check that listing is ongoing
  if (listing.listingStatus !== 'ongoing') {
    throw new BadRequestError(
      `Not allowed to commit to ${listing.listingStatus} listing.`
    );
  }

  // Check that customer has not used up max num of commits
  if (customer.numUsedCommits >= MAX_NUM_COMMITS) {
    throw new BadRequestError(
      `Customer has reached max number of ${MAX_NUM_COMMITS} commits used.`
    );
  }

  // Ensure that another commit between the customer and listing does not already exist.
  const uniqueProperties = [
    {
      property: 'customerId',
      value: Number(commitData.customerId),
    },
    {
      property: 'listingId',
      value: Number(commitData.listingId),
    },
  ];

  return commitStorage.addCommit(
    {
      ...DEFAULT_COMMIT_PAYLOAD,
      ...commitData,
      createdAt: new Date(),
    },
    uniqueProperties
  );
};

/**
 * Pays for the commit with the specified commitId.
 * An error will be thrown if the commit is not SUCCESSFUL.
 * @param commitId Id of the commit to be deleted
 * @param paymentData Data of the payment request
 */
const payForCommit = async (
  commitId: number,
  paymentData: CommitPaymentRequest
) => {
  // Check that listing exists
  const commit = await commitStorage.getCommit(commitId);

  // Check that listing is successful
  if (commit.commitStatus !== 'successful') {
    throw new BadRequestError('Only successful commits can be paid.');
  }

  const fieldsToUpdate: CommitUpdatePayload = {
    ...paymentData,
    commitStatus: 'paid',
  };

  return commitStorage.updateCommit(commitId, fieldsToUpdate, commit.listingId);
};

/**
 * Completes the commit with the specified commitId.
 * An error will be thrown if the commit is not PAID.
 * @param commitId Id of the commit to be deleted
 */
const completeCommit = async (commitId: number) => {
  // Check that commit exists.
  const commit = await commitStorage.getCommit(commitId);

  // Check that commit is paid for.
  if (commit.commitStatus !== 'paid') {
    throw new Error('Only paid commits can be completed.');
  }

  const fieldsToUpdate: CommitUpdatePayload = {
    commitStatus: 'completed',
  };

  const updatedCommit = await commitStorage.updateCommit(
    commitId,
    fieldsToUpdate,
    commit.listingId
  );
  await sendCommitMessage(updatedCommit);
  return updatedCommit;
};

/**
 * A helper function that sends a message to customer, notifying them that their
 * commit status has changed to 'successful', 'unsuccessful' or 'completed'.
 * It uses Spot Messages API.
 * @param commit The updated commit whose new status is to be notified to customer
 */
const sendCommitMessage = async (commit: CommitResponse) => {
  const listing = await listingStorage.getListing(commit.listingId);
  const customer = await customerStorage.getCustomer(commit.customerId);

  let text = '';
  switch (commit.commitStatus) {
    case 'successful':
      text = 'Group Buy is successful! Please proceed to payment.';
      break;
    case 'unsuccessful':
      text =
        "Unfortunately, Group Buy was unsuccessful as there weren't enough buyers.";
      break;
    case 'completed':
      text = 'Your item has been delivered by the merchant!';
      break;
    default:
      throw new InternalServerError(
        'Invalid commitStatus for sending a message.'
      );
  }

  const completeCommitMessage = {
    imageUrl: listing.imgUrl,
    title: listing.name,
    text,
    actions: [
      {
        label: 'View Listing',
        url: encodeMicroappsUrl(`listing/${listing.id}`),
      },
    ],
    recipients: [
      {
        phoneNumber: {
          number: customer.gpayContactNumber,
        },
      },
    ],
  };

  return sendMessage(completeCommitMessage);
};

/**
 * Deletes the commit with the specified commitId.
 * An error would be thrown if commit does not already exist,
 * or if the commit is not ONGOING,
 * or if deletion fails.
 * @param commitId Id of the commit to be deleted
 */
const deleteCommit = async (commitId: number) => {
  const commit = await commitStorage.getCommit(commitId);

  if (commit.commitStatus !== 'ongoing') {
    throw new BadRequestError(
      'Only ongoing commits are allowed to be deleted.'
    );
  }

  return commitStorage.deleteCommit(commitId, commit.listingId);
};

export default {
  getCommit,
  getAllCommits,
  addCommit,
  payForCommit,
  completeCommit,
  deleteCommit,
  sendCommitMessage,
};
