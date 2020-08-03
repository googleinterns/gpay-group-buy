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

import PaidCustomerCard from 'components/merchant/listing-details/PaidCustomerCard';
import {Commit} from 'interfaces';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 350px;
  max-height: 100%;
  overflow: scroll;
`;

interface PaidCustomerCollectionProps {
  paidCommits: Commit[];
}

/**
 * A collection of PaidCustomerCard components showing customers who have
 * committed and paid for a successful listing.
 */
const PaidCustomerCollection: React.FC<PaidCustomerCollectionProps> = ({
  paidCommits,
}) => (
  <Container>
    {paidCommits.map((paidCommit, key) => (
      <PaidCustomerCard key={key} paidCommit={paidCommit} />
    ))}
  </Container>
);

export default PaidCustomerCollection;
