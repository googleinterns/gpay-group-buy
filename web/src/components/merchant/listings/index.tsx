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

import {USER_NOT_SIGNED_IN} from 'constants/errors/sign-in-errors';

import React, {useEffect, useState} from 'react';

import {getAllListings} from 'api';
import ListingCollection from 'components/common/ListingCollection';
import MerchantPage from 'components/common/MerchantPage';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import EmptyListingsPlaceholder from 'components/merchant/listings/EmptyListingsPlaceholder';
import {Listing} from 'interfaces';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

const ListingsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const ListingsPage: React.FC = () => {
  const {hash} = useLocation();
  const {getMerchant} = useMerchantContext();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const merchant = await getMerchant();
      if (merchant === undefined) {
        throw new Error(USER_NOT_SIGNED_IN);
      }

      const listings = await getAllListings({
        merchantId: merchant.id,
      });
      setListings(listings);
    };
    fetchListings();
  }, [getMerchant]);

  return (
    <MerchantPage
      header={`${hash === '#past-listings' ? 'Past' : 'Ongoing'} Listings`}
    >
      {listings && listings.length === 0 ? (
        <EmptyListingsPlaceholder />
      ) : (
        <ListingsContainer>
          <ListingCollection listings={listings} listingRootPath="/merchant/" />
        </ListingsContainer>
      )}
    </MerchantPage>
  );
};

export default ListingsPage;
