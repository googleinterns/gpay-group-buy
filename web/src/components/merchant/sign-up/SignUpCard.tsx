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

import React from 'react';

import SignInSignUpCard from 'components/common/SignInSignUpCard';
import useSignUpForm from 'components/merchant/sign-up/hooks/useSignUpForm';
import {Link} from 'react-router-dom';

/**
 * This is the card containing the sign up form for the Merchant app.
 * It is displayed in the Sign Up page.
 */
const SignUpCard: React.FC = () => {
  return (
    <SignInSignUpCard
      buttonText="Sign Up"
      fields={[
        {label: 'Name', name: 'name', type: 'text'},
        {label: 'Email', name: 'email', type: 'email'},
        {label: 'Password', name: 'password', type: 'password'},
        {label: 'Confirm Password', name: 'confirmPassword', type: 'password'},
        {label: 'VPA', name: 'vpa', type: 'text'},
      ]}
      {...useSignUpForm()}
      signInSignUpLink={
        <>
          Already have an account? <Link to="sign-in">Sign&nbsp;in</Link> now!
        </>
      }
    />
  );
};

export default SignUpCard;
