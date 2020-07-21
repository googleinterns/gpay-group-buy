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

import {getListing} from 'api';
import {Listing} from 'interfaces';

import {useCommitContext} from './CommitContext';

type ContextType =
  | {
      listing: Listing | undefined;
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
 * ListingDetailsProvider provider with stateful listing.
 */
const ListingDetailsProvider: React.FC<ListingDetailsProviderProps> = ({
  children,
  listingId,
}) => {
  const [listing, setListing] = useState<Listing>();

  const {commitStatus} = useCommitContext();

  useEffect(() => {
    const fetchListings = async () => {
      const listing = await getListing(listingId);
      setListing(listing);
    };
    fetchListings();
  }, [commitStatus, listingId]);

  const value = {
    listing,
  };

  return (
    <ListingDetailsContext.Provider value={value}>
      {children}
    </ListingDetailsContext.Provider>
  );
};

export default ListingDetailsProvider;
export {useListingDetailsContext};
