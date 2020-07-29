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

import {Listing} from 'interfaces';
import styled from 'styled-components';

const CommitStatusStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  margin-bottom: 20px;
`;

const CommitStatusBullet = styled.div`
  font-size: 48px;
  line-height: 28px;
  margin-right: 10px;
  color: var(--${props => props.color});
`;

const CommitStatusText = styled.div`
  width: 290px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
`;

const CommitStatusCount = styled.div`
  font-weight: bold;
`;

interface CommitStatusStatsProps {
  colour: 'bright-red' | 'yellow' | 'green';
  label: ReactNode;
  count: number;
}

const CommitStatusStats: React.FC<CommitStatusStatsProps> = ({
  colour,
  label,
  count,
}) => (
  <CommitStatusStatsContainer>
    <CommitStatusBullet color={colour}>&#8226;</CommitStatusBullet>
    <CommitStatusText>
      <div>{label}</div>
      <CommitStatusCount>{count}</CommitStatusCount>
    </CommitStatusText>
  </CommitStatusStatsContainer>
);

const CommittedCustomersStatuses = styled.div`
  max-height: 100%;
  width: max-content;
`;

interface CommittedCustomerStatusesProps {
  listing: Listing;
}

const CommittedCustomerStatuses: React.FC<CommittedCustomerStatusesProps> = ({
  listing,
}) => {
  const {numCommits, numPaid, numCompleted} = listing;
  return (
    <CommittedCustomersStatuses>
      <CommitStatusStats
        colour="green"
        label="Completed"
        count={numCompleted}
      />
      <CommitStatusStats
        colour="yellow"
        label="Awaiting Payment"
        count={numCommits - numPaid}
      />
      <CommitStatusStats
        colour="bright-red"
        label={<b>Pending Action</b>}
        count={numPaid - numCompleted}
      />
    </CommittedCustomersStatuses>
  );
};

export default CommittedCustomerStatuses;
