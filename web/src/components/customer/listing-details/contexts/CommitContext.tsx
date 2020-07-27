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

import {getCommits, addCommit, deleteCommit, payForCommit} from 'api';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import {useCommitFeedbackPromptContext} from 'components/customer/listing-details/contexts/CommitFeedbackPromptContext';
import {CommitStatus, CommitPaymentPayload} from 'interfaces';

type ContextType =
  | {
      commitStatus: CommitStatus | undefined;
      onCommit: () => Promise<void>;
      onUncommit: () => Promise<void>;
      onPayment: () => Promise<void>;
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
    idToken,
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
    const customer = await getCustomerWithLogin();

    if (customer === undefined || idToken === undefined) {
      // TODO: Handle case when user refuse to login even after prompted
      return;
    }

    const commit = await addCommit(
      {
        listingId,
        customerId: customer.id,
      },
      idToken
    );
    // TODO: Handle addition error
    setCommitId(commit.id);
    await refetchCustomer();
    setCommitStatus(commit.commitStatus);
    onOpenPrompt('successful-commit');
  };

  const onUncommit = async () => {
    if (commitId === undefined) {
      return;
    }

    const customer = await getCustomerWithLogin();

    if (customer === undefined || idToken === undefined) {
      // TODO: Handle case when user refuse to login even after prompted
      return;
    }

    await deleteCommit(commitId, idToken);
    // TODO: Handle deletion error
    setCommitId(undefined);
    await refetchCustomer();
    setCommitStatus(undefined);
  };

  const onPayment = async () => {
    if (commitId === undefined) {
      return;
    }

    await getCustomerWithLogin();
    if (idToken === undefined) {
      // TODO: Handle case when user refuse to login even after prompted
      return;
    }

    // TODO: Ask customer for actual payment data
    const dummyPaymentData: CommitPaymentPayload = {
      fulfilmentDetails: {
        name: 'Shopaholic',
        address:
          '3 North Avenue, Maker Maxity, Bandra Kurla Complex, Bandra East, Mumbai, 400051',
        contactNumber: '+912266117150',
      }
    };

    const commit = await payForCommit(commitId, dummyPaymentData, idToken);
    // TODO: Handle payment error
    await refetchCustomer();
    setCommitStatus(commit.commitStatus);
    onOpenPrompt('successful-payment');
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
