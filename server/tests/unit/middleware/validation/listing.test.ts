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

import httpMocks from 'node-mocks-http';
import sinon from 'sinon';

import * as mockedMerchantAuth from '../../../../src/middleware/__mocks__/merchant-auth';
import * as merchantAuth from '../../../../src/middleware/merchant-auth';
import validateAndFormatListing from '../../../../src/middleware/validation/listing';
import {BadRequestError} from '../../../../src/utils/http-errors';

// Mock middlewares
jest.mock('../../../../src/middleware/merchant-auth');

const {
  mockMerchantAuth,
} = merchantAuth as typeof mockedMerchantAuth;

describe('Listing validation', () => {
  beforeAll(() => {
    mockMerchantAuth();
  });

  const validListing = {
    merchantId: 5075408403824640,
    name: 'Google Nest Mini',
    price: {
      currency: 'INR',
      dollars: 4299,
      cents: 0,
    },
    oldPrice: {
      currency: 'INR',
      dollars: 4499,
      cents: 0,
    },
    imgUrl:
      'https://images.unsplash.com/photo-1528310263469-da619c84a9a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=684&q=80',
    description:
      'Google Nest Mini sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.',
    deadline: '2020-08-06T20:42:00.000Z',
    minCommits: 10,
  };
  // describe('Valid listing', () => {
  //   const validListing = {};
  //
  //   test('Should return validated listing', () => {
  //
  //   });
  // });

  describe('Listing with invalid deadline', () => {
    const listingWithInvalidDeadline = {
      ...validListing,
      deadline: 'deadline',
    };

    test('Should throw an error', () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/listings',
        body: listingWithInvalidDeadline,
      });
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      validateAndFormatListing(req, res, next);
      expect(
        next.calledWithExactly(
          new BadRequestError('Listing deadline is not a valid date.')
        )
      );
    });
  });
});
