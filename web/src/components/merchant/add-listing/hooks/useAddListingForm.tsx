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

import {useState} from 'react';

import {useForm} from 'react-hook-form';
import {countDecimalPlaces} from 'utils/decimal-places';

type AddListingData = {
  name: string;
};

/**
 * This custom hook handles all the logic related to Add Listing Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and adding listing to database upon clicking 'ADD LISTING' button.
 */
const useAddListingForm = () => {
  const {
    errors: formErrors,
    formState,
    handleSubmit,
    register,
    watch,
  } = useForm<AddListingData>({
    mode: 'onChange',
  });
  const [generalError, setGeneralError] = useState<Error | undefined>();

  const validations = {
    name: register({
      required: AddListingErrors.NAME_EMPTY,
    }),
    currency: register({
      required: AddListingErrors.CURRENCY_EMPTY,
    }),
    price: register({
      required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
      validate: value =>
        countDecimalPlaces(Number(value)) <= 2 ||
        AddListingErrors.PRICE_DECIMAL_PLACES,
    }),
    oldPrice: register({
      required: AddListingErrors.NUMBER_NOT_GIVEN, // Shows error when input is empty or not a number.
      validate: {
        decimalPlaces: value =>
          countDecimalPlaces(Number(value)) <= 2 ||
          AddListingErrors.PRICE_DECIMAL_PLACES,
        moreThanPrice: value =>
          Number(value) >= Number(watch('price')) ||
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
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: AddListingData) => {
    setGeneralError(undefined); // Reset general error message.
    const {name} = values;
    alert(name);
  });

  return {
    disabled,
    errors: {
      form: formErrors,
      general: generalError,
    },
    onSubmit,
    validations,
  };
};

export default useAddListingForm;
