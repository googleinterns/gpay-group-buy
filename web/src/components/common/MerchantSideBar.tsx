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

import Button from 'components/common/Button';
import CentralisedContainer from 'components/common/CentralisedContainer';
import MuiRow from 'muicss/lib/react/row';
import styled from 'styled-components';

import {ReactComponent as CreditCard} from 'assets/credit-card.svg';
import {ReactComponent as Mail} from 'assets/mail.svg';
import {ReactComponent as Shop} from 'assets/shop.svg';

const SideBarContainer = styled(CentralisedContainer)`
  min-height: 100vh;
  height: 100%;
  width: 20%;

  box-shadow: 5px 0px 10px var(--light-gray);
  margin: 0;

  justify-content: space-between;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

const Row = styled(MuiRow)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled(CentralisedContainer)`
  width: 10%;
  margin-right: 3%;
`;

const TextContainer = styled.div`
  width: 100%;
  justify-content: left;
  overflow-wrap: anywhere;
`;

const StyledButton = styled(Button)`
  font-size: 0.85em;
`;

/**
 * This is a side bar for merchant pages. It shows merchant's profile and buttons
 * to view merchant's ongoing and past listings.
 */
const MerchantSideBar: React.FC = () => {
  const dummyMerchant = {
    name: 'Merchant Name',
    email: 'merchant@email.com',
    vpa: 'merchantVpa@bank',
  };

  return (
    <SideBarContainer>
      <CentralisedContainer>
        <Shop />
        <Header>{dummyMerchant.name}</Header>
        <DetailsContainer>
          <Row>
            <IconContainer>
              <Mail />
            </IconContainer>
            <TextContainer>{dummyMerchant.email}</TextContainer>
          </Row>
          <Row>
            <IconContainer>
              <CreditCard />
            </IconContainer>
            <TextContainer>{dummyMerchant.vpa}</TextContainer>
          </Row>
        </DetailsContainer>
      </CentralisedContainer>
      <CentralisedContainer>
        <StyledButton>View Ongoing Listings</StyledButton>
        <StyledButton>View Past Listings</StyledButton>
      </CentralisedContainer>
    </SideBarContainer>
  );
};

export default MerchantSideBar;
