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

type AddListingData = {
  name: string;
};

/**
 * This custom hook handles all the logic related to Add Listing Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and adding listing to database upon clicking 'ADD LISTING' button.
 */
const useAddListingForm = () => {
  const {errors: formErrors, formState, handleSubmit, register} = useForm<
    AddListingData
  >({
    mode: 'onChange',
  });
  const [generalError, setGeneralError] = useState<Error | undefined>();

  const validations = {
    name: register({
      required: 'Product name cannot be empty.',
    }),
  };
  // TODO(#139): Add form input validations.
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: AddListingData) => {
    setGeneralError(undefined); // Reset general error message.
    const {name} = values;
    alert(name);
    // TODO(143): Add listing to database.
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
