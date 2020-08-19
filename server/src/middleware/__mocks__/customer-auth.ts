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

// Imported for typing purposes
import type customerAuthMiddleware from '../customer-auth';

const customerAuthOriginalImpl = jest.requireActual('../customer-auth').default;

const customerAuthMockedImpl: typeof customerAuthMiddleware = (
  req,
  res,
  next
) => {
  req.decodedCustomer = {sub: 'some-random-sub'};
  next();
};

export const customerAuth = jest.fn(customerAuthMockedImpl);

/**
 * Apply mock implementation of customer auth once.
 */
export const mockCustomerAuth = () => {
  customerAuth.mockImplementationOnce(customerAuthMockedImpl);
};

/**
 * Remove fake implementations of mocks and restore actual implementation.
 */
export const restoreCustomerAuth = () => {
  customerAuth.mockImplementation(customerAuthOriginalImpl);
};

export default customerAuth;
