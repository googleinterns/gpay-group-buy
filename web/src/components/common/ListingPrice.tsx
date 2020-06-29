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

import {Money} from 'interfaces';
import styled from 'styled-components';
import {formatMoney} from 'utils/money';

const PriceContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;

  & > * {
    word-break: break-word;
  }
`;

interface PriceProps {
  largerFont?: boolean;
}

const Price = styled.div`
  font-size: ${({ largerFont }: PriceProps) =>
    largerFont ? '2.3em' : '1.7em'};
  padding-right: 5px;
`;

const OldPrice = styled.div`
  font-size: 1em;
  text-decoration: line-through;
`;

interface ListingPriceProps {
  price: Money;
  oldPrice?: Money;
  largerFont?: boolean;
}

/**
 * Listing price component that shows the current price and its previous price.
 */
const ListingPrice: React.FC<ListingPriceProps> = ({price, oldPrice, largerFont}) => (
  <PriceContainer>
    <Price largerFont={largerFont}>{formatMoney(price)}</Price>
    {oldPrice && <OldPrice>{formatMoney(oldPrice)}</OldPrice>}
  </PriceContainer>
);

export default ListingPrice;
