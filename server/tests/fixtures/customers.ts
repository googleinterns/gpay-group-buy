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
    address: 'Blk 42, Serangoon Road, #01-22',
    contactNumber: '+6591234567',
    gpayId: 1,
  },
  {
    address: 'Blk 2, Ang Mo Kio Ave 10, #18-02',
    contactNumber: '+6593320321',
    gpayId: 2,
  },
  {
    address: 'Blk 7, Pasir Ris St 72, #05-01',
    contactNumber: '+6581045287',
    gpayId: 3,
  },
];

/**
 * Test datastore ids for customers.
 */
const ids = data.map((_, idx) => idx + 1);

export default {data, ids};
