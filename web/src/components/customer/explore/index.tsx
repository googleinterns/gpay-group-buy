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

import CommitsBadge from 'components/common/CommitsBadge';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import ListingCollection from 'components/customer/explore/ListingCollection';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const CustomerExplorePage: React.FC = () => {
  const {login} = useCustomerContext();

  const handleGetIdentity = async () => login();

  return (
    <PageContainer>
      <CommitsBadgeContainer>
        <CommitsBadge />
      </CommitsBadgeContainer>
      <h1>Explore</h1>
      <ListingCollection />
      <Button color="primary" onClick={handleGetIdentity}>
        Get Identity
      </Button>
    </PageContainer>
  );
};

export default CustomerExplorePage;
