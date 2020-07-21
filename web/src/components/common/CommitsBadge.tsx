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

import {MAX_NUM_COMMITS} from 'constants/customer';

import React from 'react';

import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import styled, {css} from 'styled-components';

type PosType = 'absolute' | 'static';

const AbsolutePosStyle = css`
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 999; /* Ensure always on top */
`;

const StaticPosStyle = css``;

interface CommitsBadgeProps {
  pos?: PosType;
  visible?: boolean;
}

const CommitBadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;

  padding: 6px 16px;
  width: max-content;
  background: var(--pale-gray);
  border-radius: 999px; /* Ensure pill shape */
  text-align: center;
  font-size: 0.9em;

  /* stylelint-disable value-keyword-case */
  ${({pos}: CommitsBadgeProps) => {
    switch (pos) {
      case 'absolute':
        return AbsolutePosStyle;
      case 'static':
        return StaticPosStyle;
      default:
        return StaticPosStyle;
    }
  }};
  ${({visible}: CommitsBadgeProps) => !visible && 'visibility: hidden;'};
  /* stylelint-enable value-keyword-case */
`;

const CommitCount = styled.span`
  font-weight: bolder;
  font-size: 1.3em;
  color: var(--green);
  margin: 0 4px;
`;

interface CommitsBadgeProps {
  pos?: PosType;
}

/**
 * A CommitsBadge component indicating the number of commits the customer
 * has left.
 */
const CommitsBadge: React.FC<CommitsBadgeProps> = ({pos = 'static'}) => {
  const {customer} = useCustomerContext();
  const numCommits = customer?.numOngoingCommits;

  return (
    <CommitBadgeContainer pos={pos} visible={numCommits !== undefined}>
      <>
        Commits Left:
        <CommitCount>
          {numCommits !== undefined && (
            <>{Math.max(MAX_NUM_COMMITS - numCommits, 0)}</>
          )}
        </CommitCount>
        out of {MAX_NUM_COMMITS}
      </>
    </CommitBadgeContainer>
  );
};

export default CommitsBadge;
