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

const NAME_EMPTY = 'Name cannot be empty.';
const EMAIL_EMPTY = 'Email cannot be empty.';
const PASSWORD_EMPTY = 'Password cannot be empty.';
const VPA_EMPTY = 'VPA cannot be empty.';

const PASSWORDS_DO_NOT_MATCH = 'Passwords do not match.';

const INVALID_EMAIL = 'Please input a valid email address.';
const WEAK_PASSWORD = 'Password should be at least 6 characters.';
const EMAIL_ALREADY_IN_USE =
  'The email address is already in use by another account.';

const SERVER_ERROR = 'Oops, something is wrong. Please try again later!';

export default {
  NAME_EMPTY,
  EMAIL_EMPTY,
  PASSWORD_EMPTY,
  VPA_EMPTY,
  PASSWORDS_DO_NOT_MATCH,
  INVALID_EMAIL,
  WEAK_PASSWORD,
  EMAIL_ALREADY_IN_USE,
  SERVER_ERROR,
};
