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
      required: 'Product name cannot be empty.',
    }),
    currency: register({
      required: 'Currency cannot be empty.',
    }),
    price: register({
      required: 'Please enter a number.',
      validate: value =>
        countDecimalPlaces(Number(value)) <= 2 ||
        'Price can have at most 2 decimal places.',
    }),
    oldPrice: register({
      required: 'Please enter a number.',
      validate: {
        decimalPlaces: value =>
          countDecimalPlaces(Number(value)) <= 2 ||
          'Price can have at most 2 decimal places.',
        moreThanPrice: value =>
          Number(value) > Number(watch('price')) ||
          'Discounted price must be lower than original price.',
      },
    }),
    deadline: register({
      required: 'Deadline cannot be empty.',
    }),
    minCommits: register({
      required: 'Please enter a number.',
      validate: value =>
        countDecimalPlaces(Number(value)) === 0 ||
        'Minimum no of buyers must be a whole number.',
    }),
    description: register({
      required: 'Description cannot be empty.',
    }),
    imageUrl: register({
      required: 'Image URL cannot be empty.',
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
