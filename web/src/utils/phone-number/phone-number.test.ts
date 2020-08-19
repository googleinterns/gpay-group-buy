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

import {getNationalNumber} from 'utils/phone-number';

describe('getNationalNumber', () => {
  test('it should extract national number accurately', () => {
    const numberInputs = ['+91 1234567890', '+65 81234567'];
    const expectedValues = ['1234567890', '81234567'];

    numberInputs.forEach((numberInput, idx) => {
      expect(getNationalNumber(numberInput)).toBe(expectedValues[idx]);
    });
  });
});
