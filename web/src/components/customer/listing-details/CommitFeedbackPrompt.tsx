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

import {ReactComponent as CelebrateSvg} from 'assets/celebrate.svg';
import {ReactComponent as NotifySvg} from 'assets/customer/notify.svg';
import {ReactComponent as PaymentSvg} from 'assets/customer/payment.svg';

interface PromptProps {
  isVisible: boolean;
  title: string;
  header?: JSX.Element;
  onClose: () => void;
}

const Prompt: React.FC<PromptProps> = ({onClose, ...props}) => (
  <MobilePrompt
    {...props}
    buttons={[
      {
        name: 'Manage',
        // TODO: Link to My Commits page onClick instead
        onClick: onClose,
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
