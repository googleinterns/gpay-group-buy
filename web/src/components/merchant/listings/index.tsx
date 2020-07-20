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
import CentralisedContainer from 'components/common/CentralisedContainer';
import ListingCollection from 'components/common/ListingCollection';
import MerchantSideBar from 'components/common/MerchantSideBar';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import EmptyListingsPlaceholder from 'components/merchant/listings/EmptyListingsPlaceholder';
import {Listing} from 'interfaces';
import Row from 'muicss/lib/react/row';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const PageContent = styled(CentralisedContainer)`
  height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 5%;
`;

const HeaderRow = styled(Row)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 5%;
  margin-bottom: 1%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Header = styled.h1`
  font-weight: bolder;
`;

const ListingsBody = styled(CentralisedContainer)`
  height: 74%;
  width: 100%;
  margin-bottom: 5%;
  padding: 0;
`;

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
        merchantId: merchant.id.toString(),
      });
      setListings(listings);
    };
    fetchListings();
  }, [getMerchant]);

  return (
    <PageContainer>
      <MerchantSideBar />
      <PageContent>
        <HeaderRow>
          <Header>
            {hash === '#past-listings' ? 'Past' : 'Ongoing'} Listings
          </Header>
        </HeaderRow>
        <ListingsBody>
          {listings && listings.length === 0 ? (
            <EmptyListingsPlaceholder />
          ) : (
            <ListingsContainer>
              <ListingCollection listings={listings} />
            </ListingsContainer>
          )}
        </ListingsBody>
      </PageContent>
    </PageContainer>
  );
};

export default ListingsPage;
