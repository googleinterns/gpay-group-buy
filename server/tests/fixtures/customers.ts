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
 * Test data of customers.
 */
const data = [
  {
    defaultFulfilmentDetails: {
      name: 'John Doe',
      address: 'Blk 42, Serangoon Road, #01-22',
      contactNumber: '+91 1234567890',
    },
    gpayId: 1,
  },
  {
    defaultFulfilmentDetails: {
      name: 'Mary Jane',
      address: 'Blk 2, Ang Mo Kio Ave 10, #18-02',
      contactNumber: '+91 0987654321',
    },
    gpayId: 2,
  },
  {
    defaultFulfilmentDetails: {
      name: 'Polar Bear',
      address: 'Blk 7, Pasir Ris St 72, #05-01',
      contactNumber: '+91 1029384756',
    },
    gpayId: 3,
  },
];

/**
 * Test datastore ids for customers.
 */
const ids = data.map((_, idx) => idx + 1);

/**
 * Test response data for customers.
 */
const responseData = data.map((customer, idx) => ({
  ...customer,
  id: ids[idx],
}));

export default {data, ids, responseData};
