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

import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import CommitsBadge from 'components/common/CommitsBadge';
import { useCommitCountContext } from 'components/customer/contexts/CommitCountContext';
import { getCustomer } from 'api';
import styled from 'styled-components';

const SAMPLE_CUSTOMER_ID = 5634161670881280;

const PageContainer = styled(Container)`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const CustomerExplorePage: React.FC = () => {
  const { setNumCommits } = useCommitCountContext();

  const handleGetSampleCustomer = async () => {
    const {numCommits} = await getCustomer(SAMPLE_CUSTOMER_ID);
    setNumCommits(numCommits);
  };

  return (
    <PageContainer>
      <CommitsBadgeContainer><CommitsBadge /></CommitsBadgeContainer>
      <h1>Explore</h1>
      <Button color="primary" onClick={handleGetSampleCustomer}>Click for commit info of sample customer</Button>
    </PageContainer>
  );
};

export default CustomerExplorePage;
