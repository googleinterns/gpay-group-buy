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

// Sign in errors
export const USER_NOT_FOUND = 'auth/user-not-found';
export const PASSWORD_INCORRECT = 'auth/wrong-password';

// Sign up errors
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
export const EMAIL_INVALID = 'auth/invalid-email';
export const PASSWORD_WEAK = 'auth/weak-password';

export default {
  USER_NOT_FOUND,
  PASSWORD_INCORRECT,
  EMAIL_ALREADY_IN_USE,
  EMAIL_INVALID,
  PASSWORD_WEAK,
};
