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
import * as mockedCustomerAccessControl from '../../src/middleware/__mocks__/customer-access-control';
import * as mockedCustomerAuth from '../../src/middleware/__mocks__/customer-auth';
import * as customerAccessControlMiddleware from '../../src/middleware/customer-access-control';
import * as customerAuthMiddleware from '../../src/middleware/customer-auth';
import commitFixtures from '../fixtures/commits';
import customerFixtures from '../fixtures/customers';
import listingFixtures from '../fixtures/listings';

// Mock middlewares
jest.mock('../../src/middleware/customer-auth');
jest.mock('../../src/middleware/customer-access-control');

const {
  customerAuth,
  restoreCustomerAuth,
  mockCustomerAuth,
} = customerAuthMiddleware as typeof mockedCustomerAuth;

const {
  customerAccessControl,
  restoreCustomerAccessControl,
} = customerAccessControlMiddleware as typeof mockedCustomerAccessControl;

// Disable customer auth mock implementation by default
beforeAll(() => {
  restoreCustomerAuth();
  restoreCustomerAccessControl();
});

describe('Commits endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /commits', () => {
    test('Should not be able to fetch all commits', async () => {
      const res = await request(app).get('/commits');

      expect(res.status).toBe(400);
    });

    test('Should filter by listingId query param', async () => {
      const targetListingId = listingFixtures.ids?.[0];
      const expectedCommitData = commitFixtures.responseData.filter(
        data => data.listingId === targetListingId
      );

      const res = await request(app).get('/commits').query({
        listingId: targetListingId,
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedCommitData);
    });

    test('Should filter by customerId query param', async () => {
      const targetCustomerId = customerFixtures.ids?.[0];
      const expectedCommitData = commitFixtures.responseData.filter(
        data => data.customerId === targetCustomerId
      );

      const res = await request(app).get('/commits').query({
        customerId: targetCustomerId,
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedCommitData);
    });

    test('Should filter by more than 1 query param', async () => {
      const targetCustomerId = customerFixtures.ids?.[0];
      const targetListingId = listingFixtures.ids?.[0];
      const expectedCommitData = commitFixtures.responseData.filter(
        data =>
          data.customerId === targetCustomerId &&
          data.listingId === targetListingId
      );

      const res = await request(app).get('/commits').query({
        customerId: targetCustomerId,
        listingId: targetListingId,
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedCommitData);
    });

    test('Should not filter by disallowed query params', async () => {
      const res = await request(app).get('/commits').query({
        createdAt: '2020-06-29T03:34:00.000Z',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'createdAt is not a valid query parameter.'
      );
    });

    test('Should not filter by invalid query values', async () => {
      const res = await request(app).get('/commits').query({
        customerId: 'invalid-customer-id-type',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Invalid filter value provided for customerId.'
      );
    });
  });

  describe('POST /commits', () => {
    test('Should call customer auth', async () => {
      await request(app).post('/commits');

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer auth is not provided', async () => {
      const res = await request(app).post('/commits');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });

    test('Should call customer access control', async () => {
      mockCustomerAuth();
      const customerId = customerFixtures.ids?.[0];
      const listingId = listingFixtures.ids?.[0];

      await request(app).post('/commits').send({
        customerId,
        listingId,
      });

      expect(customerAccessControl).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer access control fails', async () => {
      mockCustomerAuth();
      const customerId = customerFixtures.ids?.[0];
      const listingId = listingFixtures.ids?.[0];

      const res = await request(app).post('/commits').send({
        customerId,
        listingId,
      });

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Not allowed to modify or access requested resource.'
      );
    });
  });

  describe('POST /commits/:commitId/pay', () => {
    test('Should call customer auth', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      await request(app).post(`/commits/${commitId}/pay`);

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer auth is not provided', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      const res = await request(app).post(`/commits/${commitId}/pay`);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });

    test('Should call customer access control', async () => {
      mockCustomerAuth();
      const commitId = commitFixtures.ids?.[0];

      await request(app).post(`/commits/${commitId}/pay`).send({
        fulfilmentDetails: {},
      });

      expect(customerAccessControl).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer access control fails', async () => {
      mockCustomerAuth();
      const commitId = commitFixtures.ids?.[0];

      const res = await request(app).post(`/commits/${commitId}/pay`).send({
        fulfilmentDetails: {},
      });

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Not allowed to modify or access requested resource.'
      );
    });
  });

  describe('DELETE /commits', () => {
    test('Should call customer auth', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      await request(app).delete(`/commits/${commitId}`);

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer auth is not provided', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      const res = await request(app).delete(`/commits/${commitId}`);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });

    test('Should call customer access control', async () => {
      mockCustomerAuth();
      const commitId = commitFixtures.ids?.[0];

      await request(app).delete(`/commits/${commitId}`);

      expect(customerAccessControl).toHaveBeenCalledTimes(1);
    });

    test('Should reject if customer access control fails', async () => {
      mockCustomerAuth();
      const commitId = commitFixtures.ids?.[0];

      const res = await request(app).delete(`/commits/${commitId}`);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Not allowed to modify or access requested resource.'
      );
    });
  });
});
