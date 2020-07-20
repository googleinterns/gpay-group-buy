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

import ListingDescription from 'components/common/ListingDescription';
import {useListingDetailsContext} from 'components/customer/listing-details/contexts/ListingDetailsContext';
import styled from 'styled-components';
import MerchantDetails from 'components/customer/listing-details/MerchantDetails';

const ListingDetailsContainer = styled.div`
  & > section {
    border-top: 1px solid var(--light-gray);
    margin: 0 1.8rem;
    padding: 1.8rem 0;
  }
  section:first-of-type {
    border-top: 0;
    padding-top: 0;
  }
  section:last-of-type {
    padding-bottom: 0;
  }
`;

const ListingImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background-color: var(--light-gray);
`;

const SectionTitle = styled.span`
  font-size: 1.2rem;
  color: var(--dark-gray);
`;

/**
 * ListingDetails that contains full listing details.
 */
const ListingDetails: React.FC = () => {
  const {listing} = useListingDetailsContext();

  return (
    <>
      {listing && (
        <ListingDetailsContainer>
          <ListingImage src={listing.imgUrl} alt={`Image of ${listing.name}`} />
          <section>
            <ListingDescription listing={listing} />
          </section>
          <section>
            <SectionTitle>Merchant Details</SectionTitle>
            <MerchantDetails merchantId={listing.merchantId} />
          </section>
        </ListingDetailsContainer>
      )}
    </>
  );
};

export default ListingDetails;
