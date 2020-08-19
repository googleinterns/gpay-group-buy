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
import * as mockedMerchantAuth from '../../src/middleware/__mocks__/merchant-auth';
import * as merchantAuthMiddleware from '../../src/middleware/merchant-auth';
import listingsFixtures from '../fixtures/listings';
import merchantFixtures from '../fixtures/merchants';

// Mock middlewares
jest.mock('../../src/middleware/merchant-auth');

const {
  merchantAuth,
  restoreMerchantAuth,
} = merchantAuthMiddleware as typeof mockedMerchantAuth;

// Disable customer auth mock implementation by default
beforeAll(() => {
  restoreMerchantAuth();
});

describe('Listings endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /listings', () => {
    test('Should fetch all listings', async () => {
      const expectedListingData = listingsFixtures.responseData;

      const res = await request(app).get('/listings');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedListingData);
    });

    test('Should filter by a single listing id', async () => {
      const expectedListingsData = [listingsFixtures.responseData?.[1]];
      const listingIds = expectedListingsData.map(listing => listing.id);

      const res = await request(app)
        .get('/listings')
        .query({
          ids: listingIds.join(','),
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedListingsData);
    });

    test('Should filter by multiple listing ids', async () => {
      const expectedListingsData = [
        listingsFixtures.responseData?.[0],
        listingsFixtures.responseData?.[1],
      ];
      const listingIds = expectedListingsData.map(listing => listing.id);

      const res = await request(app)
        .get('/listings')
        .query({
          ids: listingIds.join(','),
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedListingsData);
    });

    test('Should not filter by an invalid listing id', async () => {
      const invalidListingId = 'invalid-listing-id';

      const res = await request(app)
        .get('/listings')
        .query({
          ids: [invalidListingId],
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        `Invalid listingId ${invalidListingId}`
      );
    });

    test('Should not filter if one of the listing ids is invalid', async () => {
      const invalidListingId = 'invalid-listing-id';
      const listingIds = [
        listingsFixtures.ids[0],
        invalidListingId,
        listingsFixtures.ids[1],
      ];

      const res = await request(app)
        .get('/listings')
        .query({
          ids: listingIds.join(','),
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        `Invalid listingId ${invalidListingId}`
      );
    });

    test('Should not filter by other fields when filtering by listing ids', async () => {
      const targetListingId = listingsFixtures.ids?.[0];
      const targetMerchantId = merchantFixtures.ids?.[0];

      const res = await request(app).get('/listings').query({
        ids: targetListingId,
        merchantId: targetMerchantId,
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Cannot query by other fields if ids is specified.'
      );
    });

    test('Should not filter by empty listing ids', async () => {
      const res = await request(app).get('/listings').query({
        ids: '',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        'Query parameter ids cannot be empty.'
      );
    });
  });

  describe('POST /listings', () => {
    test('Should call merchant auth', async () => {
      await request(app).post('/listings');

      expect(merchantAuth).toHaveBeenCalled();
    });

    test('Should reject if merchant auth is not provided', async () => {
      const res = await request(app).post('/listings');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization header.');
    });
  });
});
