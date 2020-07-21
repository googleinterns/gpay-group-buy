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
 * Test data of merchants.
 */
const data = [
  {
    name: 'pusheen',
    email: 'merchant@pusheen.com',
    vpa: 'one@vpa',
    firebaseUid: '1',
  },
  {
    name: 'rilakkuma',
    email: 'merchant@rilakkuma.com',
    vpa: 'two@vpa',
    firebaseUid: '2',
  },
  {
    name: 'minnie',
    email: 'merchant@minnie.com',
    vpa: 'three@vpa',
    firebaseUid: '3',
  },
];

/**
 * Test datastore ids for merchants.
 */
const ids = data.map((_, idx) => idx + 1);

/**
 * Test response data for merchants.
 */
const responseData = data.map((merchant, idx) => ({
  ...merchant,
  id: ids[idx],
}));

export default {data, ids, responseData};
