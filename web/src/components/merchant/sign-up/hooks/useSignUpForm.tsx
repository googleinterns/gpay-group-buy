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

import FirebaseErrors from 'constants/errors/firebase-errors';
import SignUpErrors from 'constants/errors/sign-up-errors';

import {useState} from 'react';

import {addMerchant} from 'api';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import firebaseAuth, {getFirebaseIdToken, getFirebaseUid} from 'firebase-auth';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

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
  const {
    errors: formErrors,
    formState,
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<SignUpData>({
    mode: 'onChange',
  });
  const [generalError, setGeneralError] = useState<Error | undefined>();
  const {setMerchant} = useMerchantContext();
  const history = useHistory();

  const validations = {
    name: {
      required: SignUpErrors.NAME_EMPTY,
    },
    email: {
      required: SignUpErrors.EMAIL_EMPTY,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: SignUpErrors.EMAIL_INVALID,
      },
    },
    password: {
      required: SignUpErrors.PASSWORD_EMPTY,
      minLength: {
        value: 8,
        message: SignUpErrors.PASSWORD_WEAK,
      },
    },
    confirmPassword: {
      validate: (value: string) =>
        value === watch('password') || SignUpErrors.PASSWORDS_DO_NOT_MATCH,
    },
    vpa: {
      required: SignUpErrors.VPA_EMPTY,
      pattern: {
        value: /^[A-Z0-9]+@[A-Z0-9]+/i,
        message: SignUpErrors.VPA_INVALID,
      },
    },
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: SignUpData) => {
    setGeneralError(undefined); // Reset general error message.
    try {
      const {name, email, password, vpa} = values;
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
      const firebaseIdToken = await getFirebaseIdToken();
      const firebaseUid = await getFirebaseUid();
      const merchant = await addMerchant(
        {name, email, vpa, firebaseUid},
        firebaseIdToken
      );
      setMerchant(merchant);
      history.push('home');
    } catch (err) {
      switch (err.code) {
        case FirebaseErrors.EMAIL_INVALID:
          setError('email', 'pattern', SignUpErrors.EMAIL_INVALID);
          break;
        case FirebaseErrors.PASSWORD_WEAK:
          setError('password', 'minLength', SignUpErrors.PASSWORD_WEAK);
          break;
        case FirebaseErrors.EMAIL_ALREADY_IN_USE:
          // TODO: Check if email is also already in database. If not, delete
          // this user and retry.
          setError('email', 'unique', SignUpErrors.EMAIL_ALREADY_IN_USE);
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
      general: generalError,
    },
    onSubmit,
    register,
    validations,
  };
};

export default useSignUpForm;
