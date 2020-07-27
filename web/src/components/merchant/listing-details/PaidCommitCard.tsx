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

import Card from 'components/common/Card';
import RoundedButton from 'components/common/RoundedButton';
import {usePaidCommitCollectionContext} from 'components/merchant/listing-details/contexts/PaidCommitCollectionContext';
import styled from 'styled-components';

const CardWithLeftBorder = styled(Card)`
  width: 300px;

  border-left-color: var(--light-gray);
  border-left-style: solid;
  border-left-width: 10px;

  margin: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SendItemButton = styled(RoundedButton)`
  width: 100px;
  font-size: 0.8em;
`;

interface PaidCommitCardProps {
  index: number;
}

/**
 * A card that shows the name of product recipient and a 'SEND ITEM' button.
 */
const PaidCommitCard: React.FC<PaidCommitCardProps> = ({index}) => {
  const {
    fulfilmentDetails: {name},
  } = usePaidCommitCollectionContext()[index];
  return (
    <CardWithLeftBorder>
      <Row>
        <div>{name}</div>
        <SendItemButton color="bright-red">Send Item</SendItemButton>
      </Row>
    </CardWithLeftBorder>
  );
};

export default PaidCommitCard;
