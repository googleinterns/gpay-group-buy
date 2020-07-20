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
  USER_NOT_FOUND,
  PASSWORD_INCORRECT,
} from 'constants/errors/sign-in-errors';

import {useState} from 'react';

import {getMerchantWithFirebaseUid} from 'api';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import firebaseAuth, {getFirebaseUid} from 'firebase-auth';
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
  const [generalError, setGeneralError] = useState<Error | undefined>();
  const {setMerchant} = useMerchantContext();
  const history = useHistory();

  const validations = {
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(async (values: SignInData) => {
    setGeneralError(undefined); // Reset general error message.
    try {
      const {email, password} = values;
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      const firebaseUid = await getFirebaseUid();
      const merchant = await getMerchantWithFirebaseUid(firebaseUid);
      setMerchant(merchant);
      history.push('home');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          err.message = USER_NOT_FOUND;
          break;
        case 'auth/wrong-password':
          err.message = PASSWORD_INCORRECT;
          break;
      }
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
    register,
    validations,
  };
};

export default useSignInForm;
