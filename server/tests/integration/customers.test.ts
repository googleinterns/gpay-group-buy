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

import request from 'supertest';

import app from '../../src/app';
import customerFixtures from '../fixtures/customers';

describe('Customers endpoints', () => {
  test('it should fetch a single customer', async () => {
    const expectedCustomerData = customerFixtures.data?.[0];
    const customerId = customerFixtures.ids?.[0];

    const res = await request(app).get(`/customers/${customerId}`);

    expect(res.body).toMatchObject({
      id: customerId,
      ...expectedCustomerData,
    });
  });
});
