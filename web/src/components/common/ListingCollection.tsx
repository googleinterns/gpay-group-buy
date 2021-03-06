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
import ListingCard from 'components/common/ListingCard';
import StrippedCol from 'components/common/StrippedCol';
import {Listing} from 'interfaces';
import {isMobile} from 'react-device-detect';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ListingsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

interface ListingProps {
  listing: Listing;
  listingRootPath: string;
}

const ListingItem: React.FC<ListingProps> = ({
  listing: {
    id,
    name,
    price,
    oldPrice,
    deadline,
    numCommits,
    minCommits,
    imgUrl,
  },
  listingRootPath,
}) => {
  return (
    <StrippedCol xs={isMobile ? 6 : 2} key={id}>
      <Link
        to={{
          pathname: `${listingRootPath}listing/${id}`,
          state: {
            hasBack: true,
          },
        }}
      >
        <ListingCard
          listingName={name}
          price={price}
          oldPrice={oldPrice}
          endDate={deadline}
          imgUrl={imgUrl}
        >
          <CommitProgress
            numCommits={numCommits}
            minCommits={minCommits}
            textPos="none"
          />
        </ListingCard>
      </Link>
    </StrippedCol>
  );
};

interface ListingCollectionProps {
  listings: Listing[];
  listingRootPath?: string;
}

const ListingCollection: React.FC<ListingCollectionProps> = ({
  listings,
  listingRootPath = '/',
}) => {
  return (
    <ListingsContainer>
      {listings?.map(listing => (
        <ListingItem
          listing={listing}
          listingRootPath={listingRootPath}
          key={listing.id}
        />
      ))}
    </ListingsContainer>
  );
};

export default ListingCollection;
