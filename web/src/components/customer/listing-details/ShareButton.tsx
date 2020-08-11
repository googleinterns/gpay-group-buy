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

import {useListingDetailsContext} from 'components/customer/listing-details/contexts/ListingDetailsContext';
import {requestSharing} from 'microapps';
import Button from 'muicss/lib/react/button';
import {Share2 as Share} from 'react-feather';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

const PROMO_TEXT = 'Check out this great deal I found on GPay Group Buy!';

const StyledButton = styled(Button)`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  padding: 15px;
`;

const ShareIcon = styled(Share)`
  width: 1.5em;
`;

const ShareButton: React.FC = () => {
  const {pathname} = useLocation();
  const {listing} = useListingDetailsContext();

  const onShare = () => {
    requestSharing(listing?.name, PROMO_TEXT, pathname);
  };

  return (
    <>
      {listing && (
        <StyledButton onClick={onShare} color="primary">
          <ShareIcon />
        </StyledButton>
      )}
    </>
  );
};

export default ShareButton;
