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
import DeadlineTag from 'components/common/DeadlineTag';
import LazyWrapper from 'components/common/LazyWrapper';
import ListingPrice from 'components/common/ListingPrice';
import {Money} from 'interfaces';
import styled, {css} from 'styled-components';

type ChildrenPos = 'bottom' | 'right';

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

interface DetailsProps {
  childrenPos?: ChildrenPos;
}

const detailsColStyle = css`
  flex-direction: column;
`;

const detailsRowStyle = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > div {
    margin-left: 5px;

    :first-child {
      margin-left: 0;
    }
  }
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

const DetailsContent = styled.div`
  flex: auto;
`;

const Details = styled.div`
  display: flex;

  /* stylelint-disable value-keyword-case */
  ${({childrenPos}: DetailsProps) => {
    switch (childrenPos) {
      case 'right':
        return detailsRowStyle;
      case 'bottom':
      default:
        return detailsColStyle;
    }
  }};
  /* stylelint-enable value-keyword-case */
`;

const ListingName = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--dark-gray);
`;

interface ListingCardProps {
  listingName: string;
  price: Money;
  oldPrice: Money;
  endDate: string;
  imgUrl: string;
  horizontal?: boolean;
  childrenPos?: ChildrenPos;
}

/**
 * Listing card component that displays basic listing details.
 * Can be either horizontal or vertical.
 */
const ListingCard: React.FC<ListingCardProps> = ({
  listingName,
  price,
  oldPrice,
  imgUrl,
  endDate,
  horizontal,
  childrenPos = 'bottom',
  children,
}) => (
  <LazyWrapper>
    <Card
      img={{
        url: imgUrl,
        alt: `Image of ${listingName}`,
      }}
      horizontal={horizontal}
    >
      <CardContent>
        <DeadlineTag deadline={endDate} />
        <Details childrenPos={childrenPos}>
          <DetailsContent>
            <ListingName>{listingName}</ListingName>
            <ListingPrice price={price} oldPrice={oldPrice} />
          </DetailsContent>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Details>
      </CardContent>
    </Card>
  </LazyWrapper>
);

export default ListingCard;
