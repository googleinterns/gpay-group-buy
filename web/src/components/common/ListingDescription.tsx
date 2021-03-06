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

import CommitProgress from 'components/common/CommitProgress';
import DeadlineTag from 'components/common/DeadlineTag';
import ListingPrice from 'components/common/ListingPrice';
import {CommitProgressFontSize, Listing, PriceFontSize} from 'interfaces';
import styled from 'styled-components';

const Container = styled.div`
  & > * {
    padding: 5px 0;

    :first-child {
      margin-top: 10px;
    }
  }
`;

const ListingName = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--dark-gray);
`;

const Description = styled.p`
  color: var(--dark-gray);
  margin: 0;
`;

interface ListingDescriptionProps {
  listing: Listing;
  priceFontSize?: PriceFontSize;
  commitProgressFontSize?: CommitProgressFontSize;
}

/**
 * ListingDescription component that contains full listing description.
 */
const ListingDescription: React.FC<ListingDescriptionProps> = ({
  listing: {
    name,
    price,
    oldPrice,
    deadline,
    description,
    numCommits,
    minCommits,
  },
  priceFontSize,
  commitProgressFontSize,
}) => (
  <Container>
    <DeadlineTag deadline={deadline} fontSize="medium" />
    <ListingName>{name}</ListingName>
    <ListingPrice price={price} oldPrice={oldPrice} fontSize={priceFontSize} />
    <Description>{description}</Description>
    <CommitProgress
      minCommits={minCommits}
      numCommits={numCommits}
      textPos="top"
      fontSize={commitProgressFontSize}
    />
  </Container>
);

export default ListingDescription;
