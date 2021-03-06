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

import Form from 'components/common/Form';
import GroupBuyMerchantHeader from 'components/common/GroupBuyMerchantHeader';
import Row from 'muicss/lib/react/row';
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

const StyledRow = styled(Row)`
  height: 40px;
  display: block;
  line-height: 40px;

  & > a {
    color: var(--green);
  }
`;

interface SignInSignUpCardProps {
  signInSignUpLink: React.ReactNode;
}

/**
 * This is the card containing the sign in/sign up form for the Merchant app.
 * It is displayed in the Sign In/Sign Up page respectively.
 */
const SignInSignUpCard: React.FC<SignInSignUpCardProps> = ({
  signInSignUpLink,
}) => {
  return (
    <CardContainer>
      <GroupBuyMerchantHeader />
      <Form />
      <StyledRow>{signInSignUpLink}</StyledRow>
    </CardContainer>
  );
};

export default SignInSignUpCard;
