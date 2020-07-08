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

import customerFixtures from './customers';
import listingFixtures from './listings';

/**
 * Test data of commits.
 */
const data = [
  {
    createdAt: new Date('2020-06-23T03:34:00.000Z'),
    listingId: listingFixtures.ids[0],
    customerId: customerFixtures.ids[0],
    commitStatus: 'ongoing',
  },
  {
    createdAt: new Date('2020-06-29T03:34:00.000Z'),
    listingId: listingFixtures.ids[0],
    customerId: customerFixtures.ids[1],
    commitStatus: 'ongoing',
  },
];

/**
 * Test datastore ids for commits.
 */
const ids = data.map((_, idx) => idx + 1);

const responseData = data.map((commit, idx) => ({
  ...commit,
  id: ids[idx],
  createdAt: commit.createdAt.toISOString(),
}));

export default {data, ids, responseData};
