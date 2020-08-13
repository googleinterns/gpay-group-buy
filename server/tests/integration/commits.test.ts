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
import commitFixtures from '../fixtures/commits';
import customerFixtures from '../fixtures/customers';
import listingFixtures from '../fixtures/listings';
import {customerAuth, restoreCustomerAuth} from '../mocks/customer-auth';

// Mock customerAuth middleware
jest.mock('../../src/middleware/customer-auth');

// Disable customer auth mock implementation by default
beforeAll(() => {
  restoreCustomerAuth();
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
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      const res = await request(app).post(`/commits/${commitId}/pay`);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization token.');
    });
  });

  describe('POST /commits/:commitId/pay', () => {
    test('Should require customer auth', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      await request(app).post(`/commits/${commitId}/pay`);

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /commits', () => {
    test('Should require customer auth', async () => {
      // Does not have to exist since we are just testing that auth is called
      const commitId = 999;

      await request(app).delete(`/commits/${commitId}`);

      expect(customerAuth).toHaveBeenCalledTimes(1);
    });
  });
});
