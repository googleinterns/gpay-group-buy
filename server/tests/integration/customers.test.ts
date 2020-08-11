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

import app from '../../src';
import customerFixtures from '../fixtures/customers';

describe('Customers endpoints', () => {
  describe('GET /customers', () => {
    test('Should fetch a single customer', async () => {
      const expectedCustomerData = customerFixtures.responseData?.[0];
      const customerId = expectedCustomerData.id;

      const res = await request(app).get(`/customers/${customerId}`);

      expect(res.body).toMatchObject(expectedCustomerData);
    });
  });

  test('Should not fetch by invalid id param', async () => {
    const customerId = 'invalid-customer-id-type';

    const res = await request(app).get(`/customers/${customerId}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toBe(`Invalid customerId ${customerId}`);
  });

  test('Should not fetch by non-existent customerId', async () => {
    const customerId = customerFixtures.ids.length + 1;

    const res = await request(app).get(`/customers/${customerId}`);

    // TODO: Test for actual error status codes when implemented
    expect(res.status).not.toBe(200);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toBe(
      `Customer ${customerId} does not exist`
    );
  });
});
