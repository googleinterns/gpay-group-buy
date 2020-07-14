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
import {Listing} from 'interfaces';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

const ListingImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background-color: var(--light-gray);
`;

const SectionContainer = styled(Container)`
  padding: 0 1.8rem;
`;

interface ListingDetailsProps {
  listing: Listing;
}

/**
 * ListingDetailsSection that contains full listing details.
 */
const ListingDetails: React.FC<ListingDetailsProps> = ({listing}) => {
  const {name, imgUrl} = listing;

  return (
    <>
      <ListingImage src={imgUrl} alt={`Image of ${name}`} />
      <SectionContainer>
        <ListingDescription listing={listing} />
      </SectionContainer>
    </>
  );
};

export default ListingDetails;
