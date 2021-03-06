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

import styled from 'styled-components';

import {ReactComponent as GPayLogo} from 'assets/merchant/gpay-logo.svg';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled(GPayLogo)`
  width: 70px;
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: normal;
  line-height: 42px;
  margin: 0;
  text-align: center;
`;

/**
 * This is a header for the Merchant app. It consists of the GPay logo, followed
 * by the words 'Group Buy Merchant'.
 */
const GroupBuyMerchantHeader: React.FC = () => (
  <HeaderContainer>
    <Logo />
    <Header>
      Group Buy
      <br />
      <b>Merchant</b>
    </Header>
  </HeaderContainer>
);

export default GroupBuyMerchantHeader;
