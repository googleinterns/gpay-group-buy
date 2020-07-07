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
 * Test data of listing consisting of fields that are inputted by the user.
 */
const data = {
  name: 'Dell Laptop',
  price: {
    currency: 'SGD',
    dollars: 999,
    cents: 99,
  },
  oldPrice: {
    currency: 'SGD',
    dollars: 1199,
    cents: 99,
  },
  imgUrl: 'https://images.unsplash.com/photo-1593642633279-1796119d5482',
  description:
    'Original Dell laptop sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.',
  deadline: '2020-08-31T00:00:00.000Z',
  minCommits: 10,
};

/**
 * Test data of listing consisting of fields that are computed by the server.
 */
const computedProperties = {
  numCommits: 0,
  numPaid: 0,
  numCompleted: 0,
  listingStatus: 'ongoing',
};

export default {computedProperties, data};
