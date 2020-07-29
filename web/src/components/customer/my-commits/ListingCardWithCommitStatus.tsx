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

import ListingCard from 'components/common/ListingCard';
import StrippedCol from 'components/common/StrippedCol';
import CommitStatusBadge from 'components/customer/my-commits/CommitStatusBadge';
import {Listing, CommitStatus} from 'interfaces';
import styled from 'styled-components';

const CommitsContainer = styled.div`
  display: flex;
  flex-flow: column wrap;

  word-break: break-word;

  & > h2 {
    font-size: 1.4em;
  }
`;

interface ListingCardProps {
  listing: Listing;
  commitStatus: CommitStatus;
}

/**
 * A listing card that displays the customer's commit status of the listing.
 */
const ListingCardWithCommitStatus: React.FC<ListingCardProps> = ({
  listing: {name, price, oldPrice, deadline, imgUrl},
  commitStatus,
}) => (
  <StrippedCol xs={12}>
    <ListingCard
      listingName={name}
      price={price}
      oldPrice={oldPrice}
      endDate={deadline}
      imgUrl={imgUrl}
      horizontal
      childrenPos="right"
    >
      <CommitStatusBadge commitStatus={commitStatus} />
    </ListingCard>
  </StrippedCol>
);

export default ListingCardWithCommitStatus;
