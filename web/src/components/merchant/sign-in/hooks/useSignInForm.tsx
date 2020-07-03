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

import {useState} from 'react';

import {getMerchant} from 'api';
import firebaseAuth from 'firebase-auth';
import {getFirebaseIdToken} from 'firebase-auth';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

type SignInData = {
  email: string;
  password: string;
};

/**
 * This custom hook handles all the logic related to Merchant Sign In Form.
 * This includes validating form inputs, disabling submit button when there are
 * invalid inputs and signing in merchant upon clicking 'SIGN IN' button.
 */
const useSignInForm = () => {
  const {formState, handleSubmit, register} = useForm<SignInData>({
    mode: 'onChange',
  });
  const [generalError, setGeneralError] = useState();
  const history = useHistory();

  const validations = {
    email: register({
      required: Errors.EMAIL_EMPTY,
    }),
    password: register({
      required: Errors.PASSWORD_EMPTY,
    }),
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: SignInData) => {
    setGeneralError(null);
    try {
      const {email, password} = values;
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      const firebaseIdToken = await getFirebaseIdToken();
      const {id} = await getMerchant(email, firebaseIdToken);
      history.push(`/merchant/${id}`);
    } catch (err) {
      setGeneralError(err);
    }
  });

  return {
    disabled,
    errors: {
      form: {},
      general: generalError,
    },
    onSubmit,
    validations,
  };
};

export default useSignInForm;
