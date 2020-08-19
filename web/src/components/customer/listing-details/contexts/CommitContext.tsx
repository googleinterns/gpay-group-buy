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

import React, {useContext, useState, useEffect} from 'react';

import {
  getCommits,
  addCommit,
  deleteCommit,
  payForCommit,
  updateCustomer,
} from 'api';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import {useCommitFeedbackPromptContext} from 'components/customer/listing-details/contexts/CommitFeedbackPromptContext';
import {CommitStatus, FulfilmentDetails} from 'interfaces';
import {ConflictError} from 'utils/errors';
import {MaxCommitsExceededError} from 'utils/errors/commits';

type ContextType =
  | {
      commitStatus: CommitStatus | undefined;
      onCommit: () => Promise<void>;
      onUncommit: () => Promise<void>;
      onPayment: (
        fulfilmentDetails: FulfilmentDetails,
        setDefault?: boolean
      ) => Promise<void>;
    }
  | undefined;

const CommitContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a CommitContext.
 */
const useCommitContext = () => {
  const context = useContext(CommitContext);
  if (context === undefined) {
    throw new Error('useCommitContext must be used within a CommitContext');
  }
  return context;
};

interface CommitContextProps {
  listingId: number;
}

/**
 * CommitContextProvider provider with stateful commit details.
 */
const CommitContextProvider: React.FC<CommitContextProps> = ({
  children,
  listingId,
}) => {
  const {
    customer,
    getCustomerWithLogin,
    refetchCustomer,
  } = useCustomerContext();

  const {onOpen: onOpenPrompt} = useCommitFeedbackPromptContext();

  const [commitStatus, setCommitStatus] = useState<CommitStatus>();
  const [commitId, setCommitId] = useState<number | undefined>();

  useEffect(() => {
    if (customer === undefined) {
      setCommitStatus(undefined);
      return;
    }

    const fetchCommit = async () => {
      const [commit] = await getCommits({
        listingId,
        customerId: customer.id,
      });
      if (commit !== undefined) {
        setCommitId(commit.id);
        setCommitStatus(commit.commitStatus);
      }
    };
    fetchCommit();
  }, [listingId, customer]);

  const onCommit = async () => {
    const {customer, idToken} = await getCustomerWithLogin();

    if (customer === undefined || idToken === undefined) {
      onOpenPrompt('require-login');
      return;
    }

    try {
      const commit = await addCommit(
        {
          listingId,
          customerId: customer.id,
        },
        idToken
      );

      setCommitId(commit.id);
      await refetchCustomer();
      setCommitStatus(commit.commitStatus);
      onOpenPrompt('successful-commit');
    } catch (err) {
      if (err instanceof ConflictError) {
        // We will let conflict errors pass because customer
        // might not have been logged in yet when they click
        // on the Commit button.
        return;
      } else if (err instanceof MaxCommitsExceededError) {
        onOpenPrompt('max-commits-exceeded');
      } else {
        onOpenPrompt('error');
      }
    }
  };

  const onUncommit = async () => {
    if (commitId === undefined) {
      return;
    }

    const {customer, idToken} = await getCustomerWithLogin();

    if (customer === undefined || idToken === undefined) {
      onOpenPrompt('require-login');
      return;
    }

    try {
      await deleteCommit(commitId, idToken);

      setCommitId(undefined);
      await refetchCustomer();
      setCommitStatus(undefined);
    } catch {
      onOpenPrompt('error');
    }
  };

  const onPayment = async (
    fulfilmentDetails: FulfilmentDetails,
    setDefault?: boolean
  ) => {
    if (commitId === undefined) {
      return;
    }

    const {customer, idToken} = await getCustomerWithLogin();
    if (customer === undefined || idToken === undefined) {
      onOpenPrompt('require-login');
      return;
    }

    onOpenPrompt('loading');
    try {
      const commit = await payForCommit(commitId, {fulfilmentDetails}, idToken);

      if (setDefault) {
        await updateCustomer(
          customer.id,
          {defaultFulfilmentDetails: fulfilmentDetails},
          idToken
        );
      }
      await refetchCustomer();
      setCommitStatus(commit.commitStatus);
      onOpenPrompt('successful-payment');
    } catch {
      onOpenPrompt('error');
    }
  };

  const value = {
    commitStatus,
    onCommit,
    onUncommit,
    onPayment,
  };

  return (
    <CommitContext.Provider value={value}>{children}</CommitContext.Provider>
  );
};

export default CommitContextProvider;
export {useCommitContext};
