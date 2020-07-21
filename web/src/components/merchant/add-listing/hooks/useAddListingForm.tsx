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

import useFormSubmit from 'components/merchant/add-listing/hooks/useFormSubmit';
import {AddListingFormData} from 'interfaces';
import {useForm} from 'react-hook-form';

/**
 * This custom hook handles all the logic related to Add Listing Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and adding listing to database upon clicking 'ADD LISTING' button.
 */
const useAddListingForm = () => {
  const {errors: formErrors, formState, handleSubmit, register} = useForm<
    AddListingFormData
  >({
    mode: 'onChange',
  });
  const {generalError, submitAddListingFormData} = useFormSubmit();

  const validations = {
    name: {
      required: 'Product name cannot be empty.',
    },
  };
  // TODO(#139): Add form input validations.
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(submitAddListingFormData);

  return {
    disabled,
    errors: {
      form: formErrors,
      general: generalError,
    },
    onSubmit,
    register,
    validations,
  };
};

export default useAddListingForm;
