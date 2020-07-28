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

import {CommitProgressFontSize} from 'interfaces';
import {Line} from 'rc-progress';
import styled from 'styled-components';

const DEFAULT_HEIGHT = 10;

type CommitTextPos = 'none' | 'top' | 'bottom';

interface CommitProgressContainerProps {
  textPos?: CommitTextPos;
  fontSize?: CommitProgressFontSize;
}

const CommitProgressContainer = styled.div`
  display: flex;
  flex-direction: ${({textPos}: CommitProgressContainerProps) => {
    switch (textPos) {
      case 'top':
        return 'column';
      case 'bottom':
        return 'column-reverse';
      default:
        return 'column';
    }
  }};

  text-align: right;
  font-size: ${({fontSize}: CommitProgressContainerProps) => {
    switch (fontSize) {
      case 'large':
        return '2em';
      case 'medium':
        return '1em';
      case 'small':
      default:
        return '0.8em';
    }
  }};
`;

const StyledLine = styled(Line)`
  /* Hack to force Line to be a certain height without being scaled,
   because it is an svg under the hood. */
  min-height: ${DEFAULT_HEIGHT}px;
  max-height: ${DEFAULT_HEIGHT}px;
  border-radius: ${DEFAULT_HEIGHT / 2}px;
`;

const CommitCount = styled.span`
  font-weight: bold;
`;

interface CommitProgressProps {
  numCommits: number;
  minCommits: number;
  textPos?: CommitTextPos;
  thicker?: boolean;
  fontSize?: CommitProgressFontSize;
}

/**
 * Returns a progress bar indicating the number of Commiters aginst
 * the min number of commits needed.
 */
const CommitProgress: React.FC<CommitProgressProps> = ({
  numCommits,
  minCommits,
  textPos = 'bottom',
  fontSize,
}) => {
  const percent = Math.min(100, (numCommits / minCommits) * 100);

  return (
    <CommitProgressContainer textPos={textPos} fontSize={fontSize}>
      {textPos !== 'none' && (
        <div>
          <span>Commiters: </span>
          <CommitCount>
            {numCommits}/{minCommits}
          </CommitCount>
        </div>
      )}
      <StyledLine
        percent={percent}
        strokeColor="var(--green)"
        trailColor="var(--pale-green)"
        strokeLinecap="square"
      />
    </CommitProgressContainer>
  );
};

export default CommitProgress;
