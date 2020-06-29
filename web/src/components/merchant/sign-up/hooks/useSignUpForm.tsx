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

import Errors from 'constants/sign-up-errors';

import firebaseAuth from 'firebase-auth';
import {useForm, FieldValues, IsFlatObject, Message} from 'react-hook-form';

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  vpa: string;
};

type FormValues = FieldValues;

/**
 * This adds a new user account to Firebase so that user can be signed in with
 * Firebase Authentication in the future.
 */
const handleFirebaseSignUp = async (
  email: string,
  password: string,
  setError: (
    name: IsFlatObject<FormValues> extends true
      ? Extract<keyof FormValues, string>
      : 'email' | 'password' | 'name' | 'confirmPassword' | 'vpa',
    type: string,
    message?: Message
  ) => void
): Promise<void> => {
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('email', 'pattern', Errors.EMAIL_INVALID);
        break;
      case 'auth/weak-password':
        setError('password', 'minLength', Errors.PASSWORD_WEAK);
        break;
      case 'auth/email-already-in-use':
        setError('email', 'unique', Errors.EMAIL_ALREADY_IN_USE);
        break;
      default:
        throw error;
    }
  }
};

/**
 * This custom hook handles all the logic related to Merchant Sign Up Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and signing up merchant upon clicking 'SIGN UP' button.
 */
const useSignUpForm = () => {
  const {errors, formState, handleSubmit, register, setError, watch} = useForm<
    SignUpData
  >({
    mode: 'onChange',
  });

  const validations = {
    name: register({
      required: Errors.NAME_EMPTY,
    }),
    email: register({
      required: Errors.EMAIL_EMPTY,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: Errors.EMAIL_INVALID,
      },
    }),
    password: register({
      required: Errors.PASSWORD_EMPTY,
      minLength: {
        value: 8,
        message: Errors.PASSWORD_WEAK,
      },
    }),
    confirmPassword: register({
      validate: value =>
        value === watch('password') || Errors.PASSWORDS_DO_NOT_MATCH,
    }),
    vpa: register({
      required: Errors.VPA_EMPTY,
      pattern: {
        value: /^[A-Z0-9]+@[A-Z0-9]+/i,
        message: Errors.VPA_INVALID,
      },
    }),
  };
  const disabled = !formState.isValid;
  const onSubmit = handleSubmit((values: SignUpData) => {
    const {email, password} = values;
    handleFirebaseSignUp(email, password, setError);
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
