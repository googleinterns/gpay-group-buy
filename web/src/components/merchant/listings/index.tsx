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

import ListingCollection from 'components/common/ListingCollection';
import MerchantPage from 'components/common/MerchantPage';
import EmptyListingsPlaceholder from 'components/merchant/listings/EmptyListingsPlaceholder';
import useListingsApi from 'components/merchant/listings/hooks/useListingsApi';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

const ListingsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const ListingsPage: React.FC = () => {
  const {hash} = useLocation();
  const listingsType = hash === '#past-listings' ? 'Past' : 'Ongoing';
  const {listings} = useListingsApi(listingsType.toLowerCase());

  return (
    <MerchantPage header={`${listingsType} Listings`}>
      {listings &&
        (listings.length === 0 ? (
          <EmptyListingsPlaceholder />
        ) : (
          <ListingsContainer>
            <ListingCollection listings={listings} />
          </ListingsContainer>
        ))}
    </MerchantPage>
  );
};

export default ListingsPage;
