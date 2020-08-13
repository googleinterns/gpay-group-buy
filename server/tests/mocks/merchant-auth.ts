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

import * as merchantAuthOriginal from '../../src/middleware/merchant-auth';

/**
 * Mocked instance of merchantAuth.
 */
export const merchantAuth = (merchantAuthOriginal as jest.Mocked<
  typeof merchantAuthOriginal
>).default;

/**
 * Apply mock implementation of merchant auth once.
 */
export const mockMerchantAuth = () => {
  merchantAuth.mockImplementationOnce(
    jest.fn((req, res, next) => {
      next();
      return Promise.resolve();
    })
  );
};

/**
 * Remove fake implementations of mocks and restore actual implementation.
 */
export const restoreMerchantAuth = () => {
  const actualImplementation = jest.requireActual(
    '../../src/middleware/merchant-auth'
  ).default;

  merchantAuth.mockImplementation(actualImplementation);
};
