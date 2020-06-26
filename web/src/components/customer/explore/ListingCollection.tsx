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

import React, {useEffect, useState} from 'react';

import {getAllListings} from 'api';
import CommitProgress from 'components/common/CommitProgress';
import ListingCard from 'components/common/ListingCard';
import StrippedCol from 'components/common/StrippedCol';
import {Listing} from 'interfaces';
import { Link } from 'react-router-dom';

interface ListingProps {
  listing: Listing;
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
}) => (
  <StrippedCol xs={6} key={id}>
    <Link to={{
      pathname: `/listing/${id}`,
      state: {
        fromExplore: true
      }
    }}>
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

const ListingCollection: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getAllListings();
      setListings(listings);
    };
    fetchListings();
  }, []);

  return (
    <div>
      {listings?.map(listing => (
        <ListingItem listing={listing} key={listing.id} />
      ))}
    </div>
  );
};

export default ListingCollection;
