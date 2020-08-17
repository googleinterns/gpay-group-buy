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
import ErrorDisplay from 'components/common/ErrorDisplay';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import Commits from 'components/customer/my-commits/Commits';
import {Commit} from 'interfaces';
import Container from 'muicss/lib/react/container';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as AuthenticationSvg} from 'assets/customer/authentication.svg';
import {ReactComponent as EmptySvg} from 'assets/customer/empty.svg';

const PageContainer = styled(Container)`
  padding-top: 20px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

const StyledErrorDisplay = styled(ErrorDisplay)`
  height: 100%;
  flex: 1;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const PageContent = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MyCommitsContent: React.FC = () => {
  const {customer, getCustomerWithLogin} = useCustomerContext();

  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      if (customer === undefined) {
        await getCustomerWithLogin();
        return;
      }

      const fetchedCommits = await getCommits({
        customerId: customer.id,
      });
      setCommits(fetchedCommits);
    };

    fetchCommits();
  }, [customer, getCustomerWithLogin]);

  if (!customer) {
    return (
      <StyledErrorDisplay
        title="You are not logged in. Please login to continue."
        header={<AuthenticationSvg />}
        button={{
          name: 'Login',
          onClick: async () => {
            await getCustomerWithLogin();
          },
        }}
      />
    );
  } else if (commits.length === 0) {
    return (
      <StyledErrorDisplay
        title="You have no commits yet."
        header={<EmptySvg />}
      />
    );
  } else {
    return <Commits commits={commits} />;
  }
};

/**
 * Page containing all the commits of the current customer.
 */
const MyCommitsPage: React.FC = () => {
  const history = useHistory();

  const handleBack = () => history.goBack();

  return (
    <PageContainer>
      <BackButton pos="absolute" onClick={handleBack} />
      <CommitsBadgeContainer>
        <CommitsBadge />
      </CommitsBadgeContainer>
      <PageContent>
        <h1>My Commits</h1>
        <MyCommitsContent />
      </PageContent>
    </PageContainer>
  );
};

export default MyCommitsPage;
