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

import React, {useContext, useState, Dispatch, SetStateAction} from 'react';

type NumCommitsType = number | undefined;

type ContextType =
  | {
      numCommits: NumCommitsType;
      setNumCommits: Dispatch<SetStateAction<NumCommitsType>>;
    }
  | undefined;

const CommitCountContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a CommitCountProvider.
 */
const useCommitCountContext = () => {
  const context = useContext(CommitCountContext);
  if (context === undefined) {
    throw new Error(
      'useCommitCountContext must be used within a CommitCountProvider'
    );
  }
  return context;
};

/**
 * CommitCountContext provider with stateful numCommits and setNumCommits as its value.
 */
const CommitCountProvider: React.FC = ({children}) => {
  const [numCommits, setNumCommits] = useState<NumCommitsType>(undefined);
  const value = {numCommits, setNumCommits};
  return (
    <CommitCountContext.Provider value={value}>
      {children}
    </CommitCountContext.Provider>
  );
};

export default CommitCountProvider;
export {useCommitCountContext};
