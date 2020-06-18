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
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import styled from 'styled-components';

import GroupBuyMerchantHeader from 'components/common/GroupBuyMerchantHeader';
import FormRow from 'components/common/FormRow';

const CardContainer: React.FC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--pale-gray);
  border-radius: 30px;
  max-width: 670px;
  padding: 80px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 30px 0;
`;

const SubmitButton = styled.input`
  height: 60px;
  width: 300px;
  border-radius: 30px;
  border: none;

  background: var(--dark-gray);
  color: white;
  font-size: 24px;
  font-weight: bolder;
  text-transform: uppercase;

  margin-top: 80px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const OnboardingCard: React.FC =  () => (
  <CardContainer>
    <GroupBuyMerchantHeader />
    <Form>
      <FormRow label="Name" inputType="text" />
      <FormRow label="Email" inputType="email" />
      <FormRow label="Password" inputType="password" />
      <FormRow label="Confirm Password" inputType="password" />
      <FormRow label="VPA" inputType="email" />
      <StyledRow>
        <SubmitButton type="submit" value="Sign Up" />
      </StyledRow>
    </Form>
    <div>Already have an account? <a href="/sign-in">Sign in</a> now!</div>
  </CardContainer>
);

export default OnboardingCard;
