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

import {CommitStatus} from 'interfaces';
import styled, {css} from 'styled-components';

const dangerStyle = css`
  background-color: var(--bright-red);
  color: white;
`;

const successStyle = css`
  background-color: var(--pale-green);
  color: var(--green);
`;

const grayedStyle = css`
  background-color: var(--pale-gray);
  color: var(--gray);
`;

const BadgeContainer = styled.div`
  min-width: 3em;
  max-width: fit-content;
  padding: 0.5em 1em;
  border-radius: 15px;

  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
  letter-spacing: 0.5px;

  /* stylelint-disable value-keyword-case */
  ${({commitStatus}: CommitStatusBadgeProps) => {
    switch (commitStatus) {
      case 'successful':
        return dangerStyle;
      case 'paid':
      case 'completed':
        return successStyle;
      case 'unsuccessful':
        return grayedStyle;
      case 'ongoing':
      default:
        return '';
    }
  }}/* stylelint-enable value-keyword-case */
`;

const getBadgeText = (commitStatus: CommitStatus) => {
  switch (commitStatus) {
    case 'successful':
      return 'Pay';
    case 'paid':
      return 'Waiting Delivery';
    case 'completed':
      return 'Delivered';
    case 'unsuccessful':
      return 'Failed';
    case 'ongoing':
    default:
      return '';
  }
};

interface CommitStatusBadgeProps {
  commitStatus: CommitStatus;
}

/**
 * CommitStatusBadge displays the specified commit status in a styled badge.
 */
const CommitStatusBadge: React.FC<CommitStatusBadgeProps> = ({
  commitStatus,
}) => (
  <BadgeContainer commitStatus={commitStatus}>
    {getBadgeText(commitStatus)}
  </BadgeContainer>
);

export default CommitStatusBadge;
