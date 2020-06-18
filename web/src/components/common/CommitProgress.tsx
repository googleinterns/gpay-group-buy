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

import {Line} from 'rc-progress';
import styled from 'styled-components';

enum CommitTextPos {
  NONE = 0,
  TOP,
  BOTTOM,
}

interface CommitProgressContainerProps {
  textPos?: CommitTextPos;
}

const CommitProgressContainer = styled.div`
  display: flex;
  flex-direction: ${({textPos}: CommitProgressContainerProps) => {
    switch (textPos) {
      case CommitTextPos.TOP:
        return 'column';
      case CommitTextPos.BOTTOM:
        return 'column-reverse';
      default:
        return 'column';
    }
  }};
  text-align: right;
  font-size: 0.8em;
`;

interface CommitProgressProps {
  numCommits: number;
  minCommits: number;
  strokeWidth?: number;
  textPos?: CommitTextPos;
}

const CommitProgress: React.FC<CommitProgressProps> = ({
  numCommits,
  minCommits,
  strokeWidth = 5,
  textPos = CommitTextPos.BOTTOM,
}) => {
  const percent = (numCommits / minCommits) * 100;

  return (
    <CommitProgressContainer textPos={textPos}>
      {textPos && (
        <div>
          Commiters:{' '}
          <b>
            {numCommits}/{minCommits}
          </b>
        </div>
      )}
      <Line
        percent={percent}
        strokeWidth={strokeWidth}
        trailWidth={strokeWidth}
        strokeColor="var(--green)"
        trailColor="var(--pale-green)"
      />
    </CommitProgressContainer>
  );
};

export default CommitProgress;
export {CommitTextPos};
