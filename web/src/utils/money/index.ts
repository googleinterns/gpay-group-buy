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

import {Money} from 'interfaces';

/**
 * Formats a money object into a formatted currency string.
 * @param money
 */
export const formatMoney = ({currency, dollars, cents}: Money): string => {
  const amount = dollars + cents / 100;
  return new Intl.NumberFormat('en-US', {style: 'currency', currency}).format(
    amount
  );
};

/**
 * Formats value number and currency string into Money type. If the number has more
 * than 2 decimal places, it will be rounded down to 2 decimal places.
 * @param number The value of the Money in number type, can also be in exponential form
 * @param currency The 3-letter currency code defined in ISO 4217
 */
export const parseMoney = (value: number, currency: string): Money => ({
  currency,
  dollars: Math.floor(value),
  cents: Math.floor((value % 1) * 100),
});
