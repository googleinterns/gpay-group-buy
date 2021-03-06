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

import {formatMoney, parseMoney} from 'utils/money';

describe('formatMoney', () => {
  test('it should format money accurately', () => {
    const moneyInputs = [
      {
        currency: 'USD',
        dollars: 400,
        cents: 39,
      },
      {
        currency: 'USD',
        dollars: 0,
        cents: 2000,
      },
      {
        currency: 'USD',
        dollars: 1,
        cents: 2001,
      },
    ];
    const expectedValues = ['$400.39', '$20.00', '$21.01'];

    moneyInputs.forEach((moneyInput, idx) => {
      expect(formatMoney(moneyInput)).toBe(expectedValues[idx]);
    });
  });

  test('it should format money to 2 decimal places', () => {
    const moneyInputs = [
      {
        currency: 'USD',
        dollars: 400,
        cents: 1,
      },
      {
        currency: 'USD',
        dollars: 400,
        cents: 0,
      },
    ];
    const expectedValues = ['$400.01', '$400.00'];

    moneyInputs.forEach((moneyInput, idx) => {
      expect(formatMoney(moneyInput)).toBe(expectedValues[idx]);
    });
  });
});

describe('parseMoney', () => {
  test('it should parse money accurately', () => {
    const inputs = [
      {
        currency: 'INR',
        value: 400.3,
      },
      {
        currency: 'USD',
        value: 99.99,
      },
      {
        currency: 'SGD',
        value: 1,
      },
      {
        currency: 'INR',
        value: 1.999,
      },
      {
        currency: 'INR',
        value: 3e5,
      },
      {
        currency: 'INR',
        value: 3e-5,
      },
    ];
    const expectedValues = [
      {
        currency: 'INR',
        dollars: 400,
        cents: 30,
      },
      {
        currency: 'USD',
        dollars: 99,
        cents: 99,
      },
      {
        currency: 'SGD',
        dollars: 1,
        cents: 0,
      },
      {
        currency: 'INR',
        dollars: 2,
        cents: 0,
      },
      {
        currency: 'INR',
        dollars: 300000,
        cents: 0,
      },
      {
        currency: 'INR',
        dollars: 0,
        cents: 0,
      },
    ];

    inputs.forEach((input, idx) => {
      const {currency, value} = input;
      expect(parseMoney(value, currency)).toEqual(expectedValues[idx]);
    });
  });
});
