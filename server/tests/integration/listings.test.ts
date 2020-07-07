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
import firebaseAuth, {
  deleteSignedInUser,
  getFirebaseIdToken,
  getFirebaseUid,
} from '../firebase-auth';
import listingFixtures from '../fixtures/listings';
import merchantFixtures from '../fixtures/merchants';

describe('POST /listings', () => {
  let merchantId: number;
  let authHeader: string;
  let firebaseUid: string;

  beforeAll(async () => {
    const {name, email, password, vpa} = merchantFixtures.data;

    // Create user on firebase auth to generate new firebaseIdToken and firebaseUid.
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const firebaseIdToken = await getFirebaseIdToken();
    authHeader = `Bearer ${firebaseIdToken}`;
    firebaseUid = await getFirebaseUid();

    const res = await request(app)
      .post('/merchants')
      .send({name, email, vpa, firebaseUid})
      .set('Authorization', authHeader)
      .set('Content-Type', 'application/json');

    if (res.status !== 201) fail(res.body.error?.message);

    merchantId = res.body.id;
  });

  afterAll(deleteSignedInUser);

  test('it should add a single listing', async () => {
    const listingRequest = {
      merchantId,
      ...listingFixtures.data,
    };

    const res = await request(app)
      .post('/listings')
      .send(listingRequest)
      .set('Authorization', authHeader)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({
      ...listingRequest,
      ...listingFixtures.computedProperties,
    });
  });
});
