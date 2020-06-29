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
import { Redirect } from 'react-router-dom';

import FormRow from 'components/common/FormRow';
import useSignUpForm from 'components/merchant/sign-up/hooks/useSignUpForm';
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
 * This form contains all the fields to be filled in by a new merchant to sign
 * up and a button to submit the data.
 */
const SignUpForm = () => {
  const {disabled, errors, merchantId, onSubmit, toOngoingListings, validations} = useSignUpForm();
  return (
    <StyledForm>
      {toOngoingListings && <Redirect to={`/merchant/${merchantId}`}/>}
      <FormRow
        label="Name"
        inputType="text"
        forwardedRef={validations.name}
        error={errors.form.name?.message}
      />
      <FormRow
        label="Email"
        inputType="email"
        forwardedRef={validations.email}
        error={errors.form.email?.message}
      />
      <FormRow
        label="Password"
        inputType="password"
        forwardedRef={validations.password}
        error={errors.form.password?.message}
      />
      <FormRow
        label="Confirm Password"
        inputType="password"
        forwardedRef={validations.confirmPassword}
        error={errors.form.confirmPassword?.message}
      />
      <FormRow
        label="VPA"
        inputType="text"
        forwardedRef={validations.vpa}
        error={errors.form.vpa?.message}
      />
      <ErrorContainer>{errors.general?.message}</ErrorContainer>
      <StyledButton onClick={onSubmit} disabled={disabled}>
        Sign Up
      </StyledButton>
    </StyledForm>
  );
};

export default SignUpForm;
