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
import EmptyListingsPlaceholder from 'components/merchant/listings/EmptyListingsPlaceholder';
import {useLocation} from 'react-router-dom';

const AddListingPage: React.FC = () => {
  const {hash} = useLocation();

  return (
    <MerchantPage
      header={`${hash === '#past-listings' ? 'Past' : 'Ongoing'} Listings`}
    >
      <EmptyListingsPlaceholder />
    </MerchantPage>
  );
};

export default AddListingPage;