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

import {CommitStatus, ListingComputedProperties} from '../interfaces';

/**
 * Contains the default values for the optional fields on a CustomerPayload object
 * to be stored in the database.
 */
export const DEFAULT_CUSTOMER_PAYLOAD = {
  defaultFulfilmentDetails: {
    name: '',
    address: '',
    contactNumber: '',
  },
};

/**
 * Contains the default values for the fields on a CommitPayload object
 * to be stored in the database.
 */
export const DEFAULT_COMMIT_PAYLOAD = {
  commitStatus: 'ongoing' as CommitStatus,
  fulfilmentDetails: {
    name: '',
    address: '',
    contactNumber: '',
  },
};

/**
 * Contains the default values for the fields on a ListingPayload object which
 * are automatically set by ListingService during listing creation.
 */
export const DEFAULT_LISTING_PAYLOAD: ListingComputedProperties = {
  numCommits: 0,
  numPaid: 0,
  numCompleted: 0,
  listingStatus: 'ongoing',
};
