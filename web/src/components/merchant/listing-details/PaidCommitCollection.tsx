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

import {usePaidCommitCollectionContext} from 'components/merchant/listing-details/contexts/PaidCommitCollectionContext';
import PaidCommitCard from 'components/merchant/listing-details/PaidCommitCard';
import styled from 'styled-components';

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
  const paidCommits = usePaidCommitCollectionContext();
  return (
    <Container>
      {paidCommits.map((_, key) => (
        <PaidCommitCard key={key} index={key} />
      ))}
    </Container>
  );
};

export default PaidCommitCollection;
