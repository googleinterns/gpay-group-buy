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

import {countDecimalPlaces} from 'utils/decimal-places';

describe('countDecimalPlaces', () => {
  test('it should count the number of decimal places in a number correctly', () => {
    const numberInputs = [
      0,
      1,
      1.0,
      1.1,
      0.0001,
      1e-7,
      0.1e-3,
      0.1e4,
      1e8,
      1 / 2,
    ];
    const expectedValues = [0, 0, 0, 1, 4, 7, 4, 0, 0, 1];

    numberInputs.forEach((numberInput, idx) => {
      expect(countDecimalPlaces(numberInput)).toBe(expectedValues[idx]);
    });
  });

  test('it should throw an error if the input is not a number', () => {
    const numberInputs = [undefined, null, 'one', '1', NaN];

    numberInputs.forEach(numberInput => {
      // This throws a Type Error to test the behaviour if the function is given a
      // non-number input at runtime.
      expect(() => countDecimalPlaces(numberInput)).toThrow(
        'Argument is not a number.'
      );
    });
  });
});
