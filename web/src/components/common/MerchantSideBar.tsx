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
import MerchantProfile from 'components/common/MerchantProfile';
import Row from 'muicss/lib/react/row';
import styled from 'styled-components';

const SideBarContainer = styled(CentralisedContainer)`
  min-height: 100vh;
  height: 100%;
  width: 20%;

  box-shadow: 5px 0 10px var(--light-gray);
  margin: 0;

  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  font-size: 0.85em;
`;

/**
 * This is a side bar for merchant pages. It shows merchant's profile and buttons
 * to view merchant's ongoing and past listings.
 */
const MerchantSideBar: React.FC = () => (
  <SideBarContainer>
    <MerchantProfile />
    <CentralisedContainer>
      <Row>
        <StyledButton>View Ongoing Listings</StyledButton>
      </Row>
      <Row>
        <StyledButton>View Past Listings</StyledButton>
      </Row>
    </CentralisedContainer>
  </SideBarContainer>
);

export default MerchantSideBar;
