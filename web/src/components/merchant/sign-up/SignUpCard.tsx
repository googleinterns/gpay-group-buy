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

import autobind from 'autobind-decorator';
import FormRow from 'components/common/FormRow';
import GroupBuyMerchantHeader from 'components/common/GroupBuyMerchantHeader';
import firebase from 'firebase';
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

interface SignUpState {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  vpa?: string;
  errorMessage?: string;
}

/**
 * This is the card containing the sign up form for the Merchant app.
 * It is displayed in the Sign Up page.
 */
@autobind
class SignUpCard extends React.Component<{}, SignUpState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      vpa: '',
      errorMessage: '',
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name: string = event.target.name;
    const value: string = event.target.value;

    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  handleSubmit() {
    const name: string | undefined = this.state.name;
    const email: string | undefined = this.state.email;
    const password: string | undefined = this.state.password;
    const confirmPassword: string | undefined = this.state.confirmPassword;
    const vpa: string | undefined = this.state.vpa;

    if (!(name && email && password && confirmPassword && vpa)) {
      this.setState({
        errorMessage: 'Please fill in all of the fields.',
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        errorMessage: 'Passwords do not match.',
      });
      return;
    }

    // Add a new user account to Firebase.
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
      });
    }

    const setState = this.setState.bind(this);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Please input a valid email address.';
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorMessage =
            'The email address is already in use by another account.';
        } else if (errorCode === 'auth/operation-not-allowed') {
          errorMessage = 'Oops, something is wrong. Please try again later!';
        }
        setState({
          errorMessage,
        });
      });
  }

  render() {
    return (
      <CardContainer>
        <GroupBuyMerchantHeader />
        <StyledForm>
          <FormRow
            label="Name"
            inputType="text"
            onChange={this.handleInputChange}
          />
          <FormRow
            label="Email"
            inputType="email"
            onChange={this.handleInputChange}
          />
          <FormRow
            label="Password"
            inputType="password"
            onChange={this.handleInputChange}
          />
          <FormRow
            label="Confirm Password"
            inputType="password"
            onChange={this.handleInputChange}
          />
          <FormRow
            label="VPA"
            inputType="text"
            onChange={this.handleInputChange}
          />
        </StyledForm>
        <StyledRow>
          <ErrorContainer>{this.state.errorMessage}</ErrorContainer>
        </StyledRow>
        <StyledRow>
          <StyledButton onClick={this.handleSubmit}>Sign Up</StyledButton>
        </StyledRow>
        <StyledRow>
          Already have an account? <Link to="/merchant/sign-in">Sign in</Link>{' '}
          now!
        </StyledRow>
      </CardContainer>
    );
  }
}

export default SignUpCard;
