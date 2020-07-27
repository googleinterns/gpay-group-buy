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
import RoundedButton from 'components/common/RoundedButton';
import EmptyListingsPlaceholder from 'components/merchant/listings/EmptyListingsPlaceholder';
import useListings from 'components/merchant/listings/hooks/useListings';
import {Plus} from 'react-feather';
import {useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const ListingsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const ButtonContainer = styled.div`
  height: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const AddListingButton = styled(RoundedButton)`
  margin-bottom: 2%;
`;

const ListingsPage: React.FC = () => {
  const history = useHistory();
  const {hash} = useLocation();
  const listingsType = hash === '#past-listings' ? 'past' : 'ongoing';
  const listings = useListings(listingsType);

  return (
    <MerchantPage header={`${listingsType} Listings`}>
      {listings &&
        (listings.length === 0 ? (
          <EmptyListingsPlaceholder />
        ) : (
          <>
            <ButtonContainer>
              <AddListingButton
                color="green"
                onClick={() => history.push('add-listing')}
              >
                <Plus />
                Add Listing
              </AddListingButton>
            </ButtonContainer>
            <ListingsContainer>
              <ListingCollection listings={listings} />
            </ListingsContainer>
          </>
        ))}
    </MerchantPage>
  );
};

export default ListingsPage;
