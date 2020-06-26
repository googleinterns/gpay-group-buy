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

import React, {useState, useEffect} from 'react';

import {getAllListings, getCustomer} from 'api';
import CommitsBadge from 'components/common/CommitsBadge';
import ListingCollection from 'components/customer/explore/ListingCollection';
import {useCommitCountContext} from 'components/customer/contexts/CommitCountContext';
import {Listing} from 'interfaces';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

// This will be removed once we have our customer signin flow ready
const SAMPLE_CUSTOMER_ID = 5634161670881280;

const PageContainer = styled(Container)`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const CustomerExplorePage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const {setNumCommits} = useCommitCountContext();

  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getAllListings();
      setListings(listings);
    };
    fetchListings();
  }, []);

  const handleGetSampleCustomer = async () => {
    const {numCommits} = await getCustomer(SAMPLE_CUSTOMER_ID);
    setNumCommits(numCommits);
  };

  return (
    <PageContainer>
      <CommitsBadgeContainer>
        <CommitsBadge />
      </CommitsBadgeContainer>
      <h1>Explore</h1>
      <ListingCollection listings={listings} />
      <Button color="primary" onClick={handleGetSampleCustomer}>
        Click for commit info of sample customer
      </Button>
    </PageContainer>
  );
};

export default CustomerExplorePage;
