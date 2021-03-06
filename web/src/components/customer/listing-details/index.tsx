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

import BackButton from 'components/common/BackButton';
import CommitsBadge from 'components/common/CommitsBadge';
import ActionBar from 'components/customer/listing-details/ActionBar';
import CommitStatusPrompt from 'components/customer/listing-details/CommitFeedbackPrompt';
import CommitProvider from 'components/customer/listing-details/contexts/CommitContext';
import CommitFeedbackPromptProvider from 'components/customer/listing-details/contexts/CommitFeedbackPromptContext';
import FulfilmentDetailsPromptProvider from 'components/customer/listing-details/contexts/FulfilmentDetailsPromptContext';
import ListingDetailsProvider from 'components/customer/listing-details/contexts/ListingDetailsContext';
import FulfilmentDetailsPrompt from 'components/customer/listing-details/FulfulmentDetailsPrompt';
import {
  ListingLocation,
  ListingParams,
} from 'components/customer/listing-details/interfaces';
import ListingDetails from 'components/customer/listing-details/ListingDetails';
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

const ListingDetailsPage: React.FC = () => {
  const history = useHistory();
  const {state: locationState} = useLocation<ListingLocation>();
  const {listingId: listingIdStr} = useParams<ListingParams>();

  const listingId = Number(listingIdStr);

  const handleBack = () =>
    locationState?.hasBack ? history.goBack() : history.push('/');

  return (
    <CommitFeedbackPromptProvider>
      <CommitProvider listingId={listingId}>
        <FulfilmentDetailsPromptProvider>
          <ListingDetailsProvider listingId={listingId}>
            <PageContainer>
              <BackButton pos="absolute" onClick={handleBack} />
              <CommitsBadge pos="absolute" />
              <ContentContainer>
                <ListingDetails />
              </ContentContainer>
              <ActionBar />
            </PageContainer>
          </ListingDetailsProvider>
          <FulfilmentDetailsPrompt />
        </FulfilmentDetailsPromptProvider>
      </CommitProvider>
      <CommitStatusPrompt />
    </CommitFeedbackPromptProvider>
  );
};

export default ListingDetailsPage;
