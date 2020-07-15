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

import CentralisedContainer from 'components/common/CentralisedContainer';
import {CreditCard, Mail} from 'react-feather';
import styled from 'styled-components';

import {ReactComponent as Shop} from 'assets/shop.svg';

import MerchantDetail from './MerchantDetail';

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

/**
 * This is the profile of the signed-up merchant, shown on the side bar of merchant pages.
 */
const MerchantProfile: React.FC = () => {
  const dummyMerchant = {
    name: 'Merchant Name',
    email: 'merchant@email.com',
    vpa: 'merchantVpa@bank',
  };
  // TODO: Get merchant details from context instead of using dummy data.

  return (
    <CentralisedContainer>
      <Shop />
      <Header>{dummyMerchant.name}</Header>
      <DetailsContainer>
        <MerchantDetail icon={Mail} text={dummyMerchant.email} />
        <MerchantDetail icon={CreditCard} text={dummyMerchant.vpa} />
      </DetailsContainer>
    </CentralisedContainer>
  );
};

export default MerchantProfile;
