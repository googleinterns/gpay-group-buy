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

import PaidCommitProvider from 'components/merchant/listing-details/contexts/PaidCommitContext';
import PaidCommitCard from 'components/merchant/listing-details/PaidCommitCard';
import {Commit} from 'interfaces';
import styled from 'styled-components';

const DUMMY_PAID_COMMITS: Commit[] = [
  {
    commitStatus: 'successful',
    createdAt: new Date('2020-07-17T10:29:30.639Z'),
    listingId: 5068871128055808,
    customerId: 5683780991844352,
    fulfilmentDetails: {
      name: 'Buyer Name',
      contactNumber: '+911234567890',
      address: 'Rainbow Land, Pusheen St',
    },
    id: 5759630718271488,
  },
  {
    commitStatus: 'successful',
    createdAt: new Date('2020-07-17T10:29:30.639Z'),
    listingId: 5068871128055808,
    customerId: 5683780991844352,
    fulfilmentDetails: {
      name: 'Very Very Longgggggggggggggggggg Buyer Name',
      contactNumber: '+911234567890',
      address: 'Rainbow Land, Pusheen St',
    },
    id: 5759630718271488,
  },
  {
    commitStatus: 'successful',
    createdAt: new Date('2020-07-17T10:29:30.639Z'),
    listingId: 5068871128055808,
    customerId: 5683780991844352,
    fulfilmentDetails: {
      name: 'Buyer Name',
      contactNumber: '+911234567890',
      address: 'Rainbow Land, Pusheen St',
    },
    id: 5759630718271488,
  },
];

const Container = styled.div`
  max-width: 350px;
  max-height: 100%;
  overflow: scroll;
`;

/**
 * A collection of PaidCommitCard components showing customers who have
 * committed and paid for a successful listing.
 */
const PaidCommitCollection: React.FC = () => {
  // TODO: Fetch paid commits from the server.
  const paidCommits = DUMMY_PAID_COMMITS;
  return (
    <Container>
      {paidCommits.map((commit, key) => (
        <PaidCommitProvider value={commit} key={key}>
          <PaidCommitCard />
        </PaidCommitProvider>
      ))}
    </Container>
  );
};

export default PaidCommitCollection;
