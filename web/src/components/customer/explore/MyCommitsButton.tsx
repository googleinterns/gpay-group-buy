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

import Button from 'muicss/lib/react/button';
import {ButtonProps} from 'muicss/react';
import {User} from 'react-feather';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledMyCommitButton = styled(Button)`
  display: flex;
  flex-flow: row;
  align-items: center;

  padding: 0 15px;

  text-transform: capitalize;
  font-size: 0.9em;

  && {
    color: var(--dark-gray);
  }

  & > * {
    margin-left: 6px;
  }
`;

const StyledUser = styled(User)`
  height: 20px;
  width: 20px;
  border: 1.6px solid var(--dark-gray);
  border-radius: 999px;
`;

/**
 * MyCommitButton component that links to My Commits page.
 */
const MyCommitButton: React.FC<ButtonProps> = ({...buttonProps}) => (
  <Link to="/commits">
    <StyledMyCommitButton color="primary" variant="flat" {...buttonProps}>
      My Commits
      <StyledUser />
    </StyledMyCommitButton>
  </Link>
);

export default MyCommitButton;
