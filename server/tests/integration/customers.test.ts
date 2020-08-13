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
import {
  mockCustomerAuth,
  customerAuth,
  restoreCustomerAuth,
} from '../mocks/customer-auth';

// Mock customerAuth middleware
jest.mock('../../src/middleware/customer-auth');

// Disable customer auth mock implementation by default
beforeAll(() => {
  restoreCustomerAuth();
});

describe('Customers endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /customers', () => {
    test('Should fetch a single customer', async () => {
      const expectedCustomerData = customerFixtures.responseData?.[0];
      const customerId = expectedCustomerData.id;

      const res = await request(app).get(`/customers/${customerId}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedCustomerData);
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

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        `Customer ${customerId} does not exist`
      );
    });
  });

  describe('POST /customers', () => {
    test('Should require customer auth', async () => {
      await request(app).post('/customers');

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer auth is not provided', async () => {
      const res = await request(app).post('/customers');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });

    describe('Authenticated requests', () => {
      beforeEach(() => {
        mockCustomerAuth();
      });

      // TODO: Add test for 'Should create a new customer if customer does not exist'
      // when difference in behaviour for transactions between Datastore in Firestore
      // mode and the Datastore emulator is resolved.

      test('Should fetch customer if customer already exists', async () => {
        const expectedCustomerData = customerFixtures.responseData?.[0];
        const gpayId = expectedCustomerData.gpayId;

        const res = await request(app).post('/customers').send({ gpayId });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedCustomerData);
      });
    });
  });

  describe('PATCH /customers', () => {
    test('Should require customer auth', async () => {
      // Does not have to exist since we are just testing that auth works
      const customerId = 999;

      await request(app).patch(`/customers/${customerId}`);

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer auth is not provided', async () => {
      // Does not have to exist since we are just testing that auth works
      const customerId = 999;

      const res = await request(app).patch(`/customers/${customerId}`);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });

    describe('Authenticated requests', () => {
      beforeEach(() => {
        mockCustomerAuth();
      });

      test('Should modify an existing customer', async () => {
        const originalCustomerData = customerFixtures.responseData?.[0];
        const customerId = originalCustomerData.id;
        const defaultFulfilmentDetails = {
          name: 'Pusheen Takoyaki',
          address: 'Disneyland',
          contactNumber: '+911234567890',
        };
        const expectedCustomerData = {
          ...originalCustomerData,
          defaultFulfilmentDetails,
        };

        const res = await request(app).patch(`/customers/${customerId}`).send({
          defaultFulfilmentDetails,
        });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedCustomerData);
      });

      test('Should reject requests with invalid id param', async () => {
        const customerId = 'invalid-customer-id-type';

        const res = await request(app).patch(`/customers/${customerId}`);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.message).toBe(`Invalid customerId ${customerId}`);
      });

      test('Should reject requests with non-existent customerId', async () => {
        const customerId = customerFixtures.ids.length + 1;

        const res = await request(app).patch(`/customers/${customerId}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.message).toBe(
          `Customer ${customerId} does not exist`
        );
      });

      test('Should reject requests with invalid phone number', async () => {
        const customerId = customerFixtures.ids?.[0];
        const defaultFulfilmentDetails = {
          name: 'Pusheen Takoyaki',
          address: 'Disneyland',
          contactNumber: '+6591234567',
        };
        const res = await request(app).patch(`/customers/${customerId}`).send({
          defaultFulfilmentDetails,
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.message).toBe('Invalid phone number.');
      });
    });
  });
});
