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

import {addMerchant} from 'api';
import Errors from 'constants/sign-up-errors';
import firebaseAuth from 'firebase-auth';
import {getFirebaseIdToken, UserCredential} from 'firebase-auth';
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
  const {errors: formErrors, formState, handleSubmit, register, setError, watch} = useForm<
    SignUpData
  >({
    mode: 'onChange',
  });
  const [generalError, setGeneralError] = useState();
  const [merchantId, setMerchantId] = useState();
  const [toOngoingListings, setToOngoingListings] = useState(false);

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

  /**
   * This adds a new user account to Firebase so that user can be signed in with
   * Firebase Authentication in the future.
   */
  const handleFirebaseSignUp = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  };

  const onSubmit = handleSubmit(async (values: SignUpData) => {
    setGeneralError(null);
    try {
      const {name, email, password, vpa} = values;
      await handleFirebaseSignUp(email, password);

      const firebaseIdToken = await getFirebaseIdToken();
      const id = await addMerchant({name, email, vpa}, firebaseIdToken);

      setMerchantId(id);
      setToOngoingListings(true);
    } catch (err) {
      switch (err.code) {
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
          setGeneralError(err);
      }
    }
  });

  return {
    disabled,
    errors: {
      form: formErrors,
      general: generalError
    },
    merchantId,
    onSubmit,
    toOngoingListings,
    validations,
  };
};

export default useSignUpForm;
