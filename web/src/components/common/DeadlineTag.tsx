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

import {isPast} from 'date-fns';
import {DeadlineFontSize} from 'interfaces';
import styled from 'styled-components';
import {formatDeadlineFromNowText} from 'utils/date';

interface StyledDeadlineProps {
  fontSize?: DeadlineFontSize;
}

const StyledDeadline = styled.span`
  display: flex;
  justify-content: flex-end;

  color: var(--dark-gray);
  font-size: ${({fontSize}: StyledDeadlineProps) => {
    switch (fontSize) {
      case 'medium':
        return '1em';
      case 'small':
      default:
        return '0.9em';
    }
  }};
`;

const RedText = styled.span`
  color: var(--red);
`;

interface DeadlineTagProps {
  deadline: string;
  fontSize?: DeadlineFontSize;
}

/**
 * Component that displays the deadline of a listing.
 * Displays a red text with number of days left if deadline
 * is not over.
 * Displays number of days since deadline if listing has ended.
 */
const DeadlineTag: React.FC<DeadlineTagProps> = ({deadline, fontSize}) => {
  const deadlineDate = new Date(deadline);
  const tag = formatDeadlineFromNowText(deadlineDate);
  return (
    <StyledDeadline fontSize={fontSize}>
      {isPast(deadlineDate) ? <>{tag}</> : <RedText>{tag}</RedText>}
    </StyledDeadline>
  );
};

export default DeadlineTag;
