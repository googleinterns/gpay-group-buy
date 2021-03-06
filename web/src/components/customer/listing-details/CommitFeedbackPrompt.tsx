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

import React, {useState, useEffect} from 'react';

import CommitsBadge from 'components/common/CommitsBadge';
import Loading from 'components/common/Loading';
import MobilePrompt from 'components/common/MobilePrompt';
import {useCommitFeedbackPromptContext} from 'components/customer/listing-details/contexts/CommitFeedbackPromptContext';
import {useHistory} from 'react-router-dom';

import {ReactComponent as CelebrateSvg} from 'assets/celebrate.svg';
import {ReactComponent as NotifySvg} from 'assets/customer/notify.svg';
import {ReactComponent as PaymentSvg} from 'assets/customer/payment.svg';
import {ReactComponent as SadSvg} from 'assets/customer/sad.svg';
import {ReactComponent as ThinkingSvg} from 'assets/customer/thinking.svg';

interface PromptProps {
  isVisible: boolean;
  title: string;
  header?: JSX.Element;
  onClose: () => void;
}

const Prompt: React.FC<PromptProps> = ({onClose, ...props}) => {
  const history = useHistory();

  const onClickManage = () => history.push('/commits');

  return (
    <MobilePrompt
      {...props}
      buttons={[
        {
          name: 'Manage',
          onClick: onClickManage,
        },
        {
          name: 'Dismiss',
          onClick: onClose,
        },
      ]}
    >
      <CommitsBadge />
    </MobilePrompt>
  );
};

/**
 * CommitStatusPrompt that shows the appropriate feedback prompt to the customer.
 */
const CommitStatusPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState(<></>);
  const {
    isPromptVisible,
    promptContent,
    onClose,
  } = useCommitFeedbackPromptContext();

  useEffect(() => {
    switch (promptContent) {
      case 'successful-commit':
        setPrompt(
          <Prompt
            title="You have committed to the listing!"
            header={<CelebrateSvg />}
            isVisible={isPromptVisible}
            onClose={onClose}
          />
        );
        break;
      case 'successful-payment':
        setPrompt(
          <Prompt
            title="You have successfully paid for your item!"
            header={<PaymentSvg />}
            isVisible={isPromptVisible}
            onClose={onClose}
          />
        );
        break;
      case 'max-commits-exceeded':
        setPrompt(
          <Prompt
            title="Sorry, you do not have enough commits left."
            header={<SadSvg />}
            isVisible={isPromptVisible}
            onClose={onClose}
          />
        );
        break;
      case 'already-committed':
        setPrompt(
          <MobilePrompt
            title="You are already committed to this listing."
            header={<ThinkingSvg />}
            isVisible={isPromptVisible}
            buttons={[
              {
                name: 'Dismiss',
                onClick: onClose,
              },
            ]}
          />
        );
        break;
      case 'loading':
        setPrompt(
          <MobilePrompt
            title="Please wait..."
            isVisible={isPromptVisible}
            buttons={[]}
          >
            <Loading />
          </MobilePrompt>
        );
        break;
      case 'require-login':
        setPrompt(
          <MobilePrompt
            title="You need to be logged in to perform this action."
            header={<NotifySvg />}
            isVisible={isPromptVisible}
            buttons={[
              {
                name: 'Dismiss',
                onClick: onClose,
              },
            ]}
          >
            <p>
              Please sign in to Group Buy with your Google account and grant us
              access to your Google Pay phone number.
            </p>
          </MobilePrompt>
        );
        break;
      case 'error':
        setPrompt(
          <MobilePrompt
            title="Something went wrong, please try again later."
            header={<NotifySvg />}
            isVisible={isPromptVisible}
            buttons={[
              {
                name: 'Dismiss',
                onClick: onClose,
              },
            ]}
          />
        );
        break;
      default:
        throw new Error('Unsupported prompt content.');
    }
  }, [isPromptVisible, promptContent, onClose]);

  return prompt;
};

export default CommitStatusPrompt;
