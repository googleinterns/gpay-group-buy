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
import merchantFixtures from '../fixtures/merchants';

// Mock middlewares
jest.mock('../../src/middleware/merchant-auth');

const {
  mockMerchantAuth,
  merchantAuth,
  restoreMerchantAuth,
} = merchantAuthMiddleware as typeof mockedMerchantAuth;

// Disable customer auth mock implementation by default
beforeAll(() => {
  restoreMerchantAuth();
});

describe('Merchants endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /merchants', () => {
    test('Should fetch a single merchant', async () => {
      const expectedMerchantData = merchantFixtures.responseData?.[0];
      const merchantId = expectedMerchantData.id;

      const res = await request(app).get(`/merchants/${merchantId}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedMerchantData);
    });

    test('Should not fetch by invalid id param', async () => {
      const merchantId = 'invalid-merchant-id-type';

      const res = await request(app).get(`/merchants/${merchantId}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(`Invalid merchantId ${merchantId}`);
    });

    test('Should not fetch by non-existent merchantId', async () => {
      const merchantId = merchantFixtures.ids.length + 1;

      const res = await request(app).get(`/merchants/${merchantId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe(
        `Merchant ${merchantId} does not exist`
      );
    });
  });

  describe('POST /merchants', () => {
    test('Should call merchant auth', async () => {
      await request(app).post('/merchants');

      expect(merchantAuth).toHaveBeenCalled();
    });

    test('Should reject if merchant auth is not provided', async () => {
      const res = await request(app).post('/merchants');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.message).toBe('Missing Authorization header.');
    });

    describe('Authenticated requests', () => {
      beforeEach(() => {
        mockMerchantAuth();
      });

      // TODO: Add test for creating merchants when difference in behaviour
      // for transactions between Datastore in Firestore mode and the
      // Datastore emulator is resolved.
    });
  });
});
