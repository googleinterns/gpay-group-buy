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

import FormRow from 'components/common/FormRow';
import useSignInForm from 'components/merchant/sign-in/hooks/useSignInForm';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 200px;
  border-radius: 20px;
  border: none;

  background: var(--dark-gray);
  color: white;
  font-size: 18px;
  font-weight: bolder;
  text-transform: uppercase;
`;

const ErrorContainer = styled.div`
  color: var(--bright-red);
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * This form contains all the fields to be filled in by a merchant to sign
 * in and a button to submit the data.
 */
const SignInForm = () => {
  const {disabled, onSubmit, validations} = useSignInForm();
  return (
    <StyledForm>
      <FormRow
        label="Email"
        inputType="email"
        forwardedRef={validations.email}
      />
      <FormRow
        label="Password"
        inputType="password"
        forwardedRef={validations.password}
      />
      <ErrorContainer></ErrorContainer>
      <StyledButton onClick={onSubmit} disabled={disabled}>
        Sign In
      </StyledButton>
    </StyledForm>
  );
};

export default SignInForm;
