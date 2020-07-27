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

import {FulfilmentDetails} from 'interfaces';
import {useForm} from 'react-hook-form';

import {useCommitContext} from '../contexts/CommitContext';

/**
 * This custom hook handles all the logic related to Delivery Details Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and signing in merchant upon clicking 'SIGN IN' button.
 */
const useDeliveryDetailsForm = () => {
  const {formState, handleSubmit, register} = useForm<FulfilmentDetails>({
    mode: 'onChange',
  });
  const {onPayment} = useCommitContext();

  const fields = [
    {label: 'Name', name: 'name', type: 'text'},
    {label: 'Contact Number', name: 'contactNumber', type: 'number'},
    {
      label: 'Delivery Address',
      name: 'address',
      type: 'textarea',
    },
  ];

  const validations = {
    name: {
      required: true,
    },
    contactNumber: {
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    address: {
      required: true,
    },
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: FulfilmentDetails) => {
    return onPayment(values);
  });

  return {
    fields,
    disabled,
    errors: {
      form: {},
      general: undefined,
    },
    onSubmit,
    register,
    validations,
  };
};

export default useDeliveryDetailsForm;
