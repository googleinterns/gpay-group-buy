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
 * Simple function that retrieves the national number of the input phone number,
 * with the assumption tha the input phone number follows our standard phone
 * number format.
 * Eg input: '+91 1234567890'
 * Eg output: '1234567890'
 * @param phoneNumber Phone number in E.123 international notation with no spaces
 * for the national phone number portion
 */
export const getNationalNumber = (phoneNumber: string): string => {
  const [_, nationalNumber] = phoneNumber.split(' ');
  return nationalNumber;
};
