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

/**
 * Test data of listings.
 */
const data = [
  {
    name: 'Airpods',
    description: 'Cheap airpods description.',
    listingStatus: 'ongoing',
    merchantId: 5644004762845184,
    imgUrl:
      'https://images.unsplash.com/photo-1512221472476-7e439affc029?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: {
      currency: 'SGD',
      dollars: 85,
      cents: 0,
    },
    oldPrice: {
      currency: 'SGD',
      dollars: 100,
      cents: 0,
    },
    numPaid: 0,
    numCompleted: 0,
    minCommits: 100,
    deadline: new Date('2020-07-08T15:59:00.000Z'),
    numCommits: 1,
  },
  {
    name: 'Beats Solo',
    description: 'Beautiful Beats description.',
    listingStatus: 'ongoing',
    merchantId: 5644004762845184,
    imgUrl:
      'https://images.unsplash.com/photo-1512221472476-7e439affc029?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: {
      currency: 'SGD',
      dollars: 299,
      cents: 0,
    },
    oldPrice: {
      currency: 'SGD',
      dollars: 150,
      cents: 0,
    },
    numPaid: 0,
    numCompleted: 0,
    minCommits: 100,
    deadline: new Date('2020-07-09T15:59:00.000Z'),
    numCommits: 0,
  },
];

/**
 * Test datastore ids for listings.
 */
const ids = data.map((_, idx) => idx + 1);

/**
 * Test response data for listings.
 */
const responseData = data.map((listing, idx) => ({
  ...listing,
  id: ids[idx],
  deadline: listing.deadline.toISOString(),
}));

export default {data, ids, responseData};
