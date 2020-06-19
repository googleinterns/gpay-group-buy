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
import ListingPrice from 'components/common/ListingPrice';
import styled from 'styled-components';

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Date = styled.span`
  display: flex;
  justify-content: flex-end;

  font-size: 0.8rem;
  color: var(--red);
`;

const ListingName = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--dark-gray);
`;

interface ListingCardProps {
  listingName: string;
  price: number;
  oldPrice: number;
  endDate: string;
  imgUrl: string;
  horizontal?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listingName,
  price,
  oldPrice,
  imgUrl,
  endDate,
  horizontal,
  children,
}) => (
  <Card
    img={{
      url: imgUrl,
      alt: `Image of ${listingName}`,
    }}
    imgLeft={horizontal}
  >
    <CardContent>
      <Date>{endDate}</Date>
      <ListingName>{listingName}</ListingName>
      <ListingPrice price={price} oldPrice={oldPrice} />
      {children}
    </CardContent>
  </Card>
);

export default ListingCard;
