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

const OngoingListingsPage: React.FC = () => {
  // TODO: Get merchant details and pass it on to MerchantSideBar.

  return (
    <PageContainer>
      <MerchantSideBar />
    </PageContainer>
  );
};

export default OngoingListingsPage;
