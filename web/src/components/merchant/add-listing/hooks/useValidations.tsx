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

import {FormInputRef} from 'components/common/interfaces';
import {ValidationOptions} from 'react-hook-form';
import {countDecimalPlaces} from 'utils/decimal-places';

type FormFields =
  | 'name'
  | 'currency'
  | 'price'
  | 'oldPrice'
  | 'deadline'
  | 'minCommits'
  | 'description'
  | 'imageUrl';

const useValidations = (
  register: (validationOptions: ValidationOptions) => FormInputRef,
  watch: (field: FormFields) => string
) => ({
  name: register({
    required: AddListingErrors.NAME_EMPTY,
  }),
  currency: register({
    required: AddListingErrors.CURRENCY_EMPTY,
  }),
  price: register({
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    min: {
      value: 0.01,
      message: AddListingErrors.PRICE_TOO_LOW,
    },
    validate: {
      decimalPlaces: value =>
        countDecimalPlaces(Number(value)) <= 2 ||
        AddListingErrors.PRICE_DECIMAL_PLACES,
      lessThanOldPrice: value =>
        !watch('oldPrice') ||
        Number(value) < Number(watch('oldPrice')) ||
        AddListingErrors.DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE,
    },
  }),
  oldPrice: register({
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    validate: {
      decimalPlaces: value =>
        countDecimalPlaces(Number(value)) <= 2 ||
        AddListingErrors.PRICE_DECIMAL_PLACES,
      moreThanPrice: value =>
        !watch('price') ||
        Number(value) > Number(watch('price')) ||
        AddListingErrors.DISCOUNTED_PRICE_MORE_THAN_ORIGINAL_PRICE,
    },
  }),
  deadline: register({
    required: AddListingErrors.DEADLINE_EMPTY,
    validate: value =>
      Date.parse(value) > Date.now() || AddListingErrors.DEADLINE_PAST,
  }),
  minCommits: register({
    required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
    min: {
      value: 1,
      message: AddListingErrors.MIN_COMMITS_TOO_LOW,
    },
    validate: value =>
      countDecimalPlaces(Number(value)) === 0 ||
      AddListingErrors.MIN_COMMITS_DECIMAL_PLACES,
  }),
  description: register({
    required: AddListingErrors.DESCRIPTION_EMPTY,
  }),
  imageUrl: register({
    required: AddListingErrors.IMAGE_URL_EMPTY,
  }),
});

export default useValidations;
