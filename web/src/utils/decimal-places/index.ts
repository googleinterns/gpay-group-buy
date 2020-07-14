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

/**
 * Counts the number of decimal places in a number.
 * @param number
 */
export const countDecimalPlaces = (number: number): number => {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('Argument is not a number.');
  }

  const numberString = number.toString();
  if (numberString.indexOf('e') > -1) {
    const [baseString, expString] = numberString.split('e');
    const exp = parseInt(expString, 10);
    const index = baseString.indexOf('.');
    const baseDecimalPlaces = index === -1 ? 0 : baseString.length - index - 1;
    return Math.max(baseDecimalPlaces - exp, 0);
  }
  const index = numberString.indexOf('.');
  return index === -1 ? 0 : numberString.length - index - 1;
};
