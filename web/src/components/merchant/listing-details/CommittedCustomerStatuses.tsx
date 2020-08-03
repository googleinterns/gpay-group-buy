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

import React, {ReactNode, useEffect, useState} from 'react';

import {getCommits} from 'api';
import PaidCustomerCollection from 'components/merchant/listing-details/PaidCustomerCollection';
import {Commit, Listing} from 'interfaces';
import styled from 'styled-components';

const CommitStatusStatsContainer = styled.div`
  margin-bottom: 40px;
`;

const CommitStatusSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

const CommitStatusDetails = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  max-height: 60vh;
`;

interface CommitStatusStatsProps {
  colour: 'bright-red' | 'yellow' | 'green';
  label: ReactNode;
  count: number;
  commits?: Commit[];
}

const CommitStatusStats: React.FC<CommitStatusStatsProps> = ({
  colour,
  label,
  count,
  commits,
}) => (
  <CommitStatusStatsContainer>
    <CommitStatusSummary>
      <CommitStatusBullet color={colour}>&#8226;</CommitStatusBullet>
      <CommitStatusText>
        <div>{label}</div>
        <CommitStatusCount>{count}</CommitStatusCount>
      </CommitStatusText>
    </CommitStatusSummary>
    <CommitStatusDetails>
      {commits && colour === 'bright-red' && (
        <PaidCustomerCollection paidCommits={commits} />
      )}
    </CommitStatusDetails>
  </CommitStatusStatsContainer>
);

const CommittedCustomersStatuses = styled.div`
  max-height: 85vh;
  width: max-content;
`;

interface CommittedCustomerStatusesProps {
  listing: Listing;
}

/**
 * A component that shows the number of customers committed to a listing who have
 * their items sent ('Completed'), have yet to pay ('Awaiting Payment') and have
 * paid but do not have their items sent yet ('Pending Action').
 */
const CommittedCustomerStatuses: React.FC<CommittedCustomerStatusesProps> = ({
  listing,
}) => {
  const {id, numCommits, numPaid, numCompleted} = listing;
  const [paidCommits, setPaidCommits] = useState<Commit[] | undefined>();

  useEffect(() => {
    const fetchPaidCommits = async () => {
      const paidCommits = await getCommits({
        listingId: id,
        commitStatus: 'paid',
      });
      setPaidCommits(paidCommits);
    };
    fetchPaidCommits();
  }, [id]);

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
        commits={paidCommits}
      />
    </CommittedCustomersStatuses>
  );
};

export default CommittedCustomerStatuses;
