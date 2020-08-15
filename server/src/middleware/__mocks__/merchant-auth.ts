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
import type merchantAuthMiddleware from '../merchant-auth';

const merchantAuthOriginalImpl = jest.requireActual('../merchant-auth').default;

const merchantAuthMockedImpl: typeof merchantAuthMiddleware = async (
  req,
  res,
  next
) => {
  next();
  return Promise.resolve();
};

/**
 * Mocked instance of merchantAuth.
 */
export const merchantAuth = jest.fn(merchantAuthMockedImpl);

/**
 * Apply mock implementation of merchant auth once.
 */
export const mockMerchantAuth = () => {
  merchantAuth.mockImplementationOnce(merchantAuthMockedImpl);
};

/**
 * Remove fake implementations of mocks and restore actual implementation.
 */
export const restoreMerchantAuth = () => {
  merchantAuth.mockImplementation(merchantAuthOriginalImpl);
};

export default merchantAuth;
