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

import {getListing, getCommits, addCommit, deleteCommit} from 'api';
import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import {useCommitFeedbackPromptContext} from 'components/customer/listing-details/contexts/CommitFeedbackPromptContext';
import {CommitStatus, Listing} from 'interfaces';

type ContextType =
  | {
      listing: Listing | undefined;
      commitStatus: CommitStatus | undefined;
      onCommit: () => Promise<void>;
      onUncommit: () => Promise<void>;
    }
  | undefined;

const ListingDetailsContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a ListingDetailsProvider.
 */
const useListingDetailsContext = () => {
  const context = useContext(ListingDetailsContext);
  if (context === undefined) {
    throw new Error(
      'useListingDetailsContext must be used within a ListingDetailsProvider'
    );
  }
  return context;
};

interface ListingDetailsProviderProps {
  listingId: number;
}

/**
 * ListingDetailsProvider provider with stateful listing and commit details.
 */
const ListingDetailsProvider: React.FC<ListingDetailsProviderProps> = ({
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

  const [listing, setListing] = useState<Listing>();

  const [commitStatus, setCommitStatus] = useState<CommitStatus>();
  const [commitId, setCommitId] = useState<number | undefined>();

  useEffect(() => {
    const fetchListings = async () => {
      const listing = await getListing(listingId);
      setListing(listing);
    };
    fetchListings();
  }, [commitStatus, listingId]);

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

  const value = {
    listing,
    commitStatus,
    onCommit,
    onUncommit,
  };

  return (
    <ListingDetailsContext.Provider value={value}>
      {children}
    </ListingDetailsContext.Provider>
  );
};

export default ListingDetailsProvider;
export {useListingDetailsContext};
