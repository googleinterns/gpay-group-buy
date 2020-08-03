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
import {Home, Phone} from 'react-feather';
import styled from 'styled-components';

const PaleGreenCard = styled(Card)`
  background: var(--pale-green);
  margin: 20px;
  padding: 5px 20px;
`;

const CustomerName = styled.h2`
  text-align: center;
  font-weight: bold;
  color: var(--green);
`;

const DetailsContainer = styled.div`
  width: max-content;
`;

const DetailsRow = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  margin: 10px;
`;

const DetailsText = styled.div`
  margin-left: 10px;
`;

const SAMPLE_FULFILMENT_DETAILS = {
  name: 'Customer Name',
  address: 'Blk 252 Ang Mo Kio Ave 4 Singapore 560252',
  contactNumber: '+65 8765 4321',
};

const {name, address, contactNumber} = SAMPLE_FULFILMENT_DETAILS;

const CustomerFulfilmentDetailsCard: React.FC = () => (
  <PaleGreenCard>
    <CustomerName>{name}</CustomerName>
    <DetailsContainer>
      <DetailsRow>
        <Home />
        <DetailsText>{address}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <Phone />
        <DetailsText>{contactNumber}</DetailsText>
      </DetailsRow>
    </DetailsContainer>
  </PaleGreenCard>
);

export default CustomerFulfilmentDetailsCard;
