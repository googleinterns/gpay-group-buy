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

import Button from 'components/common/Button';
import CentralisedContainer from 'components/common/CentralisedContainer';
import {Plus} from 'react-feather';
import {useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as BlankCanvas} from 'assets/blank-canvas.svg';

const SmallPlus = styled(Plus)`
  height: 50%;
`;

const TextContainer = styled.div`
  margin: 2% 0;
  font-size: 1.5em;
`;

const StyledButton = styled(Button)`
  font-size: 1.1em;
`;

const EmptyListingsPlaceholder: React.FC = () => {
  const history = useHistory();
  const {hash} = useLocation();

  return (
    <CentralisedContainer>
      <BlankCanvas />
      <TextContainer>
        You have no {hash === '#past-listings' ? 'past' : 'ongoing'} listings
        yet.
      </TextContainer>
      <StyledButton color="green" onClick={() => history.push('add-listing')}>
        <SmallPlus />
        <div>Add Listing</div>
      </StyledButton>
    </CentralisedContainer>
  );
};

export default EmptyListingsPlaceholder;