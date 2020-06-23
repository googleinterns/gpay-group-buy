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

import React, {useState} from 'react';

import FormRow from 'components/common/FormRow';
import GroupBuyMerchantHeader from 'components/common/GroupBuyMerchantHeader';
import firebaseAuth from 'firebase-auth';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const CardContainer: React.FC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--pale-gray);
  border-radius: 30px;
  max-width: 670px;
  padding: 40px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const StyledForm = styled(Form)`
  margin: 15px 0;
`;

const StyledRow = styled(Row)`
  height: 40px;
  display: block;
  line-height: 40px;
`;
const ErrorContainer = styled.div`
  color: var(--bright-red);
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
  margin: 0;
`;

/**
 * This is the card containing the sign up form for the Merchant app.
 * It is displayed in the Sign Up page.
 */
const SignUpCard: React.FC = () => {
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

  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setNameError('') : setNameError(Errors.NAME_EMPTY);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setEmailError('') : setEmailError(Errors.EMAIL_EMPTY);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value
      ? setPasswordError('')
      : setPasswordError(Errors.PASSWORD_EMPTY);
    // We don't check that passwords match if user hasn't filled in
    // 'Confirm Password' yet.
    !confirmPassword || event.target.value === confirmPassword
      ? setConfirmPasswordError('')
      : setConfirmPasswordError(Errors.PASSWORDS_DO_NOT_MATCH);
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
      : setConfirmPasswordError(Errors.PASSWORDS_DO_NOT_MATCH);
    setConfirmPassword(event.target.value);
  };

  const handleVpaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value ? setVpaError('') : setVpaError(Errors.VPA_EMPTY);
    setVpa(event.target.value);
  };

  const handleSubmit = () => {
    // These checks are needed because empty error in the handleChange is shown
    // only if user already fills in the field and then deletes it.
    if (!name) setNameError(Errors.NAME_EMPTY);
    if (!email) setEmailError(Errors.EMAIL_EMPTY);
    if (!password) setPasswordError(Errors.PASSWORD_EMPTY);
    if (password !== confirmPassword)
      setConfirmPasswordError(Errors.PASSWORDS_DO_NOT_MATCH);
    if (!vpa) setVpaError(Errors.VPA_EMPTY);

    if (!name || !email || !password || password !== confirmPassword || !vpa) {
      return;
    }

    handleFirebaseSignUp();
  };

  /**
   * This adds a new user account to Firebase so that user can be signed in with
   * Firebase Authentication in the future.
   */
  const handleFirebaseSignUp = async () => {
    try {
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setEmailError(Errors.INVALID_EMAIL);
      } else if (error.code === 'auth/weak-password') {
        setPasswordError(Errors.WEAK_PASSWORD);
      } else if (error.code === 'auth/email-already-in-use') {
        setEmailError(Errors.EMAIL_ALREADY_IN_USE);
      } else {
        setErrorMessage(Errors.SERVER_ERROR);
      }
    }
  };

  return (
    <CardContainer>
      <GroupBuyMerchantHeader />
      <StyledForm>
        <FormRow
          label="Name"
          inputType="text"
          onChange={handleNameChange}
          error={nameError}
        />
        <FormRow
          label="Email"
          inputType="email"
          onChange={handleEmailChange}
          error={emailError}
        />
        <FormRow
          label="Password"
          inputType="password"
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <FormRow
          label="Confirm Password"
          inputType="password"
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
        />
        <FormRow
          label="VPA"
          inputType="text"
          onChange={handleVpaChange}
          error={vpaError}
        />
      </StyledForm>
      <StyledRow>
        <ErrorContainer>{errorMessage}</ErrorContainer>
      </StyledRow>
      <StyledRow>
        <StyledButton onClick={handleSubmit}>Sign Up</StyledButton>
      </StyledRow>
      <StyledRow>
        Already have an account? <Link to="/merchant/sign-in">Sign in</Link>{' '}
        now!
      </StyledRow>
    </CardContainer>
  );
};

export default SignUpCard;
