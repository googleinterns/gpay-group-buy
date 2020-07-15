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

import {getListing} from 'api';
import BackButton from 'components/common/BackButton';
import CommitsBadge from 'components/common/CommitsBadge';
import ActionBar from 'components/customer/listing-details/ActionBar';
import useCommitStatus from 'components/customer/listing-details/hooks/useCommitStatus';
import ListingDetails from 'components/customer/listing-details/ListingDetails';
import {Listing} from 'interfaces';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow: scroll;
`;

interface ListingParams {
  listingId: string;
}

interface ListingLocation {
  fromExplore: boolean;
}

const ListingDetailsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ListingLocation>();
  const {listingId: listingIdStr} = useParams<ListingParams>();

  const listingId = Number(listingIdStr);

  const [listing, setListing] = useState<Listing>();
  const {commitStatus, onCommit, onUncommit} = useCommitStatus(listingId);

  useEffect(() => {
    const fetchListings = async () => {
      const listing = await getListing(listingId);
      setListing(listing);
    };
    fetchListings();
  }, [commitStatus, listingId]);

  const handleBack = () =>
    location.state?.fromExplore ? history.goBack() : history.push('/');

  return (
    <PageContainer>
      <BackButton pos="absolute" onClick={handleBack} />
      <CommitsBadge pos="absolute" />
      {listing && (
        <>
          <ContentContainer>
            <ListingDetails listing={listing} />
          </ContentContainer>
          <ActionBar
            commitStatus={commitStatus}
            onCommit={onCommit}
            onUncommit={onUncommit}
          />
        </>
      )}
    </PageContainer>
  );
};

export default ListingDetailsPage;
