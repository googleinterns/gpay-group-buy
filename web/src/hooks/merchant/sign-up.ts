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
  PASSWORD_EMPTY,
  PASSWORDS_DO_NOT_MATCH,
  VPA_EMPTY,
} from 'constants/sign-up-errors';

import React, {useState} from 'react';

const useMerchantSignUpForm = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [vpa, setVpa] = useState('');
  const [vpaError, setVpaError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setNameError('') : setNameError(NAME_EMPTY);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setEmailError('') : setEmailError(EMAIL_EMPTY);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value
      ? setPasswordError('')
      : setPasswordError(PASSWORD_EMPTY);
    // We don't check that passwords match if user hasn't filled in
    // 'Confirm Password' yet.
    !confirmPassword || event.target.value === confirmPassword
      ? setConfirmPasswordError('')
      : setConfirmPasswordError(PASSWORDS_DO_NOT_MATCH);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // We don't have to check if 'Confirm Password' is empty. If 'Password' is
    // is not empty and 'Confirm Password' is empty, we show PASSWORDS_DO_NOT_MATCH.
    // If both passwords are empty we show PASSWORD_EMPTY.
    event.target.value === password
      ? setConfirmPasswordError('')
      : setConfirmPasswordError(PASSWORDS_DO_NOT_MATCH);
    setConfirmPassword(event.target.value);
  };

  const handleVpaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setVpaError('') : setVpaError(VPA_EMPTY);
    setVpa(event.target.value);
  };

  const handleSubmit = () => {
    // These checks are needed because empty error in the handleChange is shown
    // only if user already fills in the field and then deletes it.
    if (!name) setNameError(NAME_EMPTY);
    if (!email) setEmailError(EMAIL_EMPTY);
    if (!password) setPasswordError(PASSWORD_EMPTY);
    if (password !== confirmPassword)
      setConfirmPasswordError(PASSWORDS_DO_NOT_MATCH);
    if (!vpa) setVpaError(VPA_EMPTY);
  };

  return {
    handleNameChange,
    nameError,
    handleEmailChange,
    emailError,
    handlePasswordChange,
    passwordError,
    handleConfirmPasswordChange,
    confirmPasswordError,
    handleVpaChange,
    vpaError,
    handleSubmit,
  };
};

export default useMerchantSignUpForm;
