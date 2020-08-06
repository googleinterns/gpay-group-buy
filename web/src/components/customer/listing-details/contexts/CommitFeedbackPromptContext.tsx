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

import React, {useContext, useState} from 'react';

type PromptContent = 'successful-commit' | 'successful-payment' | 'loading';

type ContextType =
  | {
      isPromptVisible: boolean;
      promptContent: PromptContent;
      onClose: () => void;
      onOpen: (promptContent: PromptContent) => void;
    }
  | undefined;

const CommitFeedbackPromptContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a CommitFeedbackPromptProvider.
 */
const useCommitFeedbackPromptContext = () => {
  const context = useContext(CommitFeedbackPromptContext);
  if (context === undefined) {
    throw new Error(
      'useCommitFeedbackPromptContext must be used within a CommitFeedbackPromptProvider'
    );
  }
  return context;
};

/**
 * CommitFeedbackPromptProvider with stateful promptContent and isPromptVisible.
 */
const CommitFeedbackPromptProvider: React.FC = ({children}) => {
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [promptContent, setPromptContent] = useState<PromptContent>(
    'successful-commit'
  );

  const onClose = () => {
    setIsPromptVisible(false);
  };

  const onOpen = (promptState: PromptContent) => {
    setPromptContent(promptState);
    setIsPromptVisible(true);
  };

  const value = {
    isPromptVisible,
    promptContent,
    onClose,
    onOpen,
  };

  return (
    <CommitFeedbackPromptContext.Provider value={value}>
      {children}
    </CommitFeedbackPromptContext.Provider>
  );
};

export default CommitFeedbackPromptProvider;
export {useCommitFeedbackPromptContext};
