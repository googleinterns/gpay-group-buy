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
import MerchantPage from 'components/common/MerchantPage';
import CommittedCustomerStatuses from 'components/merchant/listing-details/CommittedCustomerStatuses';
import ListingDetails from 'components/merchant/listing-details/ListingDetails';
import {Listing} from 'interfaces';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const ContentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const ListingDetailsPage: React.FC = () => {
  const {listingId: listingIdString} = useParams();
  const listingId = Number(listingIdString);
  const [listing, setListing] = useState<Listing | undefined>();

  useEffect(() => {
    const fetchListings = async () => {
      const listing = await getListing(listingId);
      setListing(listing);
    };
    fetchListings();
  }, [listingId]);

  return (
    <MerchantPage>
      <ContentContainer>
        {listing && <ListingDetails listing={listing} />}
        {listing?.listingStatus === 'successful' && (
          <CommittedCustomerStatuses listing={listing} />
        )}
      </ContentContainer>
    </MerchantPage>
  );
};

export default ListingDetailsPage;
