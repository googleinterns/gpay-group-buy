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

import MerchantSideBar from 'components/common/MerchantSideBar';
import EmptyListingsPlaceholder from 'components/merchant/ongoing-listings/EmptyListingsPlaceholder';
import Row from 'muicss/lib/react/row';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const PageContent = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderRow = styled(Row)`
  width: 75%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 5%;
  margin-bottom: 1%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;

  position: absolute;
  top: 0;
`;

const Header = styled.h1`
  font-weight: bolder;
`;

const ListingsBody = styled.div`
  height: 100%;
  width: 100%;
`;

const OngoingListingsPage: React.FC = () => {
  // TODO: Get merchant details and pass it on to MerchantSideBar.

  return (
    <PageContainer>
      <MerchantSideBar />
      <PageContent>
        <HeaderRow>
          <Header>Ongoing Listings</Header>
        </HeaderRow>
        <ListingsBody>
          <EmptyListingsPlaceholder />
        </ListingsBody>
      </PageContent>
    </PageContainer>
  );
};

export default OngoingListingsPage;
