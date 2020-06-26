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

import {
  NAME_EMPTY,
  EMAIL_EMPTY,
  EMAIL_INVALID,
  PASSWORD_EMPTY,
  PASSWORD_WEAK,
  PASSWORDS_DO_NOT_MATCH,
  VPA_EMPTY,
  VPA_INVALID,
} from 'constants/sign-up-errors';

import {useForm} from 'react-hook-form';

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  vpa: string;
};

/**
 * This custom hook handles all the logic related to Merchant Sign Up Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and signing up merchant upon clicking 'SIGN UP' button.
 */
const useSignUpForm = () => {
  const {errors, formState, handleSubmit, register, watch} = useForm<
    SignUpData
  >({
    mode: 'onChange',
  });

  const validations = {
    name: register({
      required: NAME_EMPTY,
    }),
    email: register({
      required: EMAIL_EMPTY,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: EMAIL_INVALID,
      },
    }),
    password: register({
      required: PASSWORD_EMPTY,
      minLength: {
        value: 8,
        message: PASSWORD_WEAK,
      },
    }),
    confirmPassword: register({
      validate: value => value === watch('password') || PASSWORDS_DO_NOT_MATCH,
    }),
    vpa: register({
      required: VPA_EMPTY,
      pattern: {
        value: /^[A-Z0-9]+@[A-Z0-9]+/i,
        message: VPA_INVALID,
      },
    }),
  };
  const disabled = !formState.isValid;
  const onSubmit = handleSubmit((values: SignUpData) => {
    // TODO(#72): Send Merchant Sign Up form data to Add Merchant API endpoint.
  });

  return {
    disabled,
    errors,
    onSubmit,
    validations,
  };
};

export default useSignUpForm;
