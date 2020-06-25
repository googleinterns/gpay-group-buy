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

import React from 'react';

import FormRow from 'components/common/FormRow';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import {useForm} from 'react-hook-form';
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
  margin-top: 20px;
`;

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  vpa: string;
};

const SignUpForm = () => {
  const {handleSubmit, register, watch, errors, formState} = useForm<
    SignUpData
  >({
    mode: 'onChange',
  });
  const onSubmit = (values: SignUpData) => console.log(values);

  return (
    <StyledForm>
      <FormRow
        label="Name"
        inputType="text"
        forwardedRef={register({
          required: NAME_EMPTY,
        })}
        error={errors?.name?.message}
      />
      <FormRow
        label="Email"
        inputType="email"
        forwardedRef={register({
          required: EMAIL_EMPTY,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: EMAIL_INVALID,
          },
        })}
        error={errors?.email?.message}
      />
      <FormRow
        label="Password"
        inputType="password"
        forwardedRef={register({
          required: PASSWORD_EMPTY,
          minLength: {
            value: 8,
            message: PASSWORD_WEAK,
          },
        })}
        error={errors?.password?.message}
      />
      <FormRow
        label="Confirm Password"
        inputType="password"
        forwardedRef={register({
          validate: value =>
            value === watch('password') || PASSWORDS_DO_NOT_MATCH,
        })}
        error={errors?.confirmPassword?.message}
      />
      <FormRow
        label="VPA"
        inputType="text"
        forwardedRef={register({
          required: VPA_EMPTY,
          pattern: {
            value: /^[A-Z0-9]+@[A-Z0-9]+/i,
            message: VPA_INVALID,
          },
        })}
        error={errors?.vpa?.message}
      />
      <StyledButton
        onClick={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      >
        Sign Up
      </StyledButton>
    </StyledForm>
  );
};

export default SignUpForm;
