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

import React, {useState, useEffect} from 'react';

import {getCommits} from 'api';
import BackButton from 'components/common/BackButton';
import CommitsBadge from 'components/common/CommitsBadge';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import Commits from 'components/customer/my-commits/Commits';
import {Commit, GroupedCommits} from 'interfaces';
import Container from 'muicss/lib/react/container';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

/**
 * Groups commits by their commit status.
 * @param commits Commits to be grouped
 */
const groupByCommitStatus = (commits: Commit[]): GroupedCommits =>
  commits.reduce(
    (result, commit) => ({
      ...result,
      [commit.commitStatus]: [...(result[commit.commitStatus] || []), commit],
    }),
    {} as GroupedCommits
  );

/**
 * Page containing all the commits of the current customer.
 */
const MyCommitsPage: React.FC = () => {
  const {customer, getCustomerWithLogin} = useCustomerContext();

  const [commits, setCommits] = useState<GroupedCommits>({});

  const history = useHistory();

  useEffect(() => {
    const fetchCommits = async () => {
      if (customer === undefined) {
        await getCustomerWithLogin();
        return;
      }

      const fetchedCommits = await getCommits({
        customerId: customer.id,
      });
      setCommits(groupByCommitStatus(fetchedCommits));
    };

    fetchCommits();
  }, [customer, getCustomerWithLogin]);

  const handleBack = () => history.goBack();

  return (
    <PageContainer>
      <BackButton pos="absolute" onClick={handleBack} />
      <CommitsBadgeContainer>
        <CommitsBadge />
      </CommitsBadgeContainer>
      <h1>My Commits</h1>
      <Commits commits={commits} />
    </PageContainer>
  );
};

export default MyCommitsPage;
