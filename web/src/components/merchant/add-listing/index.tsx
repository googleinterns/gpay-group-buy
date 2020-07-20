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
import AddListingForm from 'components/merchant/add-listing/AddListingForm';
import styled from 'styled-components';

const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const AddListingPage: React.FC = () => (
  <MerchantPage header="Add Listing">
    <LeftAlignedContainer>
      <AddListingForm />
    </LeftAlignedContainer>
  </MerchantPage>
);

export default AddListingPage;
