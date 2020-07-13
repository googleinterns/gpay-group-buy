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

describe('Commits endpoints', () => {
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

      expect(res.status).not.toBe(200);
      expect(res.body).toHaveProperty('error');
    });

    test('Should not filter by invalid query values', async () => {
      const res = await request(app).get('/commits').query({
        customerId: 'invalid-customer-id-type',
      });

      expect(res.status).not.toBe(200);
      expect(res.body).toHaveProperty('error');
    });
  });
});
