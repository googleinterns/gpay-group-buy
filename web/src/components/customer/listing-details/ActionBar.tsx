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

import React, {useState, useEffect, useCallback} from 'react';

import useCommitStatus from 'components/customer/listing-details/hooks/useCommitStatus';
import {CommitStatus} from 'interfaces';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import {Plus} from 'react-feather';
import styled from 'styled-components';

type ActionButtonState = CommitStatus | 'loading' | undefined;

const ActionBarContainer = styled(Container)`
  display: flex;
  justify-content: center;

  width: 100%;
  padding-bottom: 12px;
`;

const ActionButton = styled(Button)`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;

  min-width: 90%;
  border-radius: 10px;

  text-transform: uppercase;
`;

const SmallPlus = styled(Plus)`
  width: 1em;
  padding-right: 6px;
`;

interface ActionBarProps {
  listingId: number;
}

/**
 * ActionBar that contains a button to commit/uncommit/pay a listing.
 */
const ActionBar: React.FC<ActionBarProps> = ({listingId}) => {
  const [buttonState, setButtonState] = useState<ActionButtonState>();
  const [button, setButton] = useState(<></>);

  const {commitStatus, onCommit, onUncommit} = useCommitStatus(listingId);

  const getButton = useCallback(
    (buttonState: ActionButtonState): JSX.Element => {
      const onClickButton = async (callback: () => Promise<void>) => {
        setButtonState('loading');
        await callback();
      };

      switch (buttonState) {
        case 'loading':
          return <ActionButton disabled>Loading...</ActionButton>;
        case undefined:
          return (
            <ActionButton
              onClick={() => onClickButton(onCommit)}
              color="primary"
            >
              <SmallPlus />
              Commit to listing
            </ActionButton>
          );
        case 'ongoing':
          return (
            <ActionButton
              onClick={() => onClickButton(onUncommit)}
              color="danger"
            >
              Uncommit listing
            </ActionButton>
          );
        default:
          // TODO: Deal with other cases, such as paid & successful cases
          return <></>;
      }
    },
    [onCommit, onUncommit]
  );

  useEffect(() => {
    setButtonState(commitStatus);
  }, [commitStatus]);

  useEffect(() => {
    setButton(getButton(buttonState));
  }, [buttonState, getButton]);

  return <ActionBarContainer>{button}</ActionBarContainer>;
};

export default ActionBar;
