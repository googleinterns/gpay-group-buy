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

import React, {ReactNode} from 'react';

import CentralisedContainer from 'components/common/CentralisedContainer';
import MerchantSideBar from 'components/common/MerchantSideBar';
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

const PageContent = styled(CentralisedContainer)`
  height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 5%;
`;

const HeaderRow = styled(Row)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 5%;
  margin-bottom: 1%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const PageHeader = styled.h1`
  font-weight: bolder;
`;

const PageBody = styled(CentralisedContainer)`
  height: 100%;
  width: 100%;
`;

interface MerchantPageProps {
  header: ReactNode;
}

/**
 * The common format of Merchant Page which includes side bar, header and body.
 */
const MerchantPage: React.FC<MerchantPageProps> = ({header, children}) => {
  return (
    <PageContainer>
      <MerchantSideBar />
      <PageContent>
        {header && (
          <HeaderRow>
            <PageHeader>{header}</PageHeader>
          </HeaderRow>
        )}
        <PageBody>{children}</PageBody>
      </PageContent>
    </PageContainer>
  );
};

export default MerchantPage;
