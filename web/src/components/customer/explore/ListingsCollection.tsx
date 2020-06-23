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

interface ListingProps {
  listing: Listing;
}

const SingleListing: React.FC<ListingProps> = ({
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
}) => (
  <StrippedCol xs={6} key={id}>
    <ListingCard
      listingName={name}
      price={Number(price)}
      oldPrice={Number(oldPrice)}
      endDate={deadline}
      imgUrl={imgUrl}
    >
      <CommitProgress
        numCommits={numCommits}
        minCommits={minCommits}
        textPos="none"
      />
    </ListingCard>
  </StrippedCol>
);

interface ListingsCollectionProps {
  listings: Listing[];
}

const ListingsCollection: React.FC<ListingsCollectionProps> = ({listings}) => {
  return (
    <>
      {listings &&
        listings.map(listing => (
          <SingleListing listing={listing} key={listing.id} />
        ))}
    </>
  );
};

export default ListingsCollection;
