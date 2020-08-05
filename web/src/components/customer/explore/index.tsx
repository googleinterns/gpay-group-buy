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

import {getAllListings} from 'api';
import CommitsBadge from 'components/common/CommitsBadge';
import ListingCollection from 'components/common/ListingCollection';
import Loading from 'components/common/Loading';
import MyCommitButton from 'components/customer/explore/MyCommitsButton';
import {Listing} from 'interfaces';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerExplorePage: React.FC = () => {
  const [isListingsLoading, setIsListingsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getAllListings({
        listingStatus: 'ongoing',
      });
      setListings(listings);
      setIsListingsLoading(false);
    };
    fetchListings();
  }, []);

  return (
    <PageContainer>
      <CommitsBadgeContainer>
        <CommitsBadge />
      </CommitsBadgeContainer>
      <HeaderRow>
        <h1>Explore</h1>
        <MyCommitButton />
      </HeaderRow>
      {isListingsLoading ? (
        <Loading />
      ) : (
        <ListingCollection listings={listings} />
      )}
    </PageContainer>
  );
};

export default CustomerExplorePage;
