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

const NAME_EMPTY = 'Product name cannot be empty.';

const CURRENCY_EMPTY = 'Currency cannot be empty.';

// This error is shown when user inputs nothing or something that is not a number.
const NUMBER_NOT_GIVEN = 'Please enter a number.';

const PRICE_DECIMAL_PLACES = 'Price can have at most 2 decimal places.';
const PRICE_TOO_LOW = 'Price must be more than 0.';
const DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE =
  'Discounted price must be lower than original price.';

const DEADLINE_EMPTY = 'Deadline cannot be empty.';
const DEADLINE_PAST = 'Deadline must be in the future.';

const MIN_COMMITS_DECIMAL_PLACES =
  'Minimum no of buyers must be a whole number.';
const MIN_COMMITS_TOO_LOW = 'Minimum no of buyers must be more than 0.';

const DESCRIPTION_EMPTY = 'Description cannot be empty.';

const IMAGE_URL_EMPTY = 'Image URL cannot be empty.';
const IMAGE_URL_INVALID = 'Please enter a valid image URL.';

export default {
  NAME_EMPTY,
  CURRENCY_EMPTY,
  NUMBER_NOT_GIVEN,
  PRICE_DECIMAL_PLACES,
  PRICE_TOO_LOW,
  DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE,
  DEADLINE_EMPTY,
  DEADLINE_PAST,
  MIN_COMMITS_DECIMAL_PLACES,
  MIN_COMMITS_TOO_LOW,
  DESCRIPTION_EMPTY,
  IMAGE_URL_EMPTY,
  IMAGE_URL_INVALID,
};
