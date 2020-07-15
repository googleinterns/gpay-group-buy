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

import AddListingErrors from 'constants/errors/add-listing-errors';

type FormFields =
  | 'name'
  | 'currency'
  | 'price'
  | 'oldPrice'
  | 'deadline'
  | 'minCommits'
  | 'description'
  | 'imageUrl';

const useValidations = (watch: (field: FormFields) => string) => ({
  name: {
    required: AddListingErrors.NAME_EMPTY,
  },
  currency: {
    required: AddListingErrors.CURRENCY_EMPTY,
  },
  price: {
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    min: {
      value: 0.01,
      message: AddListingErrors.PRICE_TOO_LOW,
    },
    validate: (value: string) =>
      !watch('oldPrice') ||
      Number(value) < Number(watch('oldPrice')) ||
      AddListingErrors.DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE,
  },
  oldPrice: {
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    validate: (value: string) =>
      !watch('price') ||
      Number(value) > Number(watch('price')) ||
      AddListingErrors.DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE,
  },
  deadline: {
    required: AddListingErrors.DEADLINE_EMPTY,
    validate: (value: string) =>
      Date.parse(value) > Date.now() || AddListingErrors.DEADLINE_PAST,
  },
  minCommits: {
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    min: {
      value: 1,
      message: AddListingErrors.MIN_COMMITS_TOO_LOW,
    },
  },
  description: {
    required: AddListingErrors.DESCRIPTION_EMPTY,
  },
  imgUrl: {
    required: AddListingErrors.IMAGE_URL_EMPTY,
    pattern: {
      value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig,
      message: AddListingErrors.IMAGE_URL_INVALID,
    }
  },
});

export default useValidations;
