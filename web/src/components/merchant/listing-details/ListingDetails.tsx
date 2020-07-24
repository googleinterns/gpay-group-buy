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

import {getListing} from 'api';
import ListingDescription from 'components/common/ListingDescription';
import {Listing} from 'interfaces';
import styled from 'styled-components';

const ListingDetailsContainer = styled.div`
  max-width: 500px;
`;

const ListingImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background-color: var(--light-gray);
`;

interface ListingDetailsProps {
  listingId: number;
}

/**
 * ListingDetails that contains details of a listing with specified listingId. This component is different from
 * ListingDetails in components/customer/ because the former doesn't contain merchant details and has a smaller
 * font for price and a larger font for commit progress.
 */
const ListingDetails: React.FC<ListingDetailsProps> = ({listingId}) => {
  const [listing, setListing] = useState<Listing | undefined>();

  useEffect(() => {
    const fetchListings = async () => {
      const listing = await getListing(listingId);
      setListing(listing);
    };
    fetchListings();
  }, [listingId]);

  return (
    <>
      {listing && (
        <ListingDetailsContainer>
          <ListingImage src={listing.imgUrl} alt={`Image of ${listing.name}`} />
          <ListingDescription
            listing={listing}
            priceFontSize="medium"
            commitProgressFontSize="large"
          />
        </ListingDetailsContainer>
      )}
    </>
  );
};

export default ListingDetails;
