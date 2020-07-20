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

import MerchantPage from 'components/common/MerchantPage';
import ListingDetails from 'components/customer/listing-details/ListingDetails';
import ListingDetailsContext from 'components/customer/listing-details/contexts/ListingDetailsContext';
import {useParams} from 'react-router-dom';

const ListingDetailsPage: React.FC = () => {
  const {listingId: listingIdString} = useParams();
  const listingId = Number(listingIdString);

  return (
    <MerchantPage header={null}>
      <ListingDetailsContext listingId={listingId}>
        <ListingDetails />
      </ListingDetailsContext>
    </MerchantPage>
  );
};

export default ListingDetailsPage;
