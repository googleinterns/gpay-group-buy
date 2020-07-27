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

import {USER_NOT_SIGNED_IN} from 'constants/errors/sign-in-errors';

import {useEffect, useState} from 'react';

import {getAllListings} from 'api';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import {Listing} from 'interfaces';

type ListingsType = 'ongoing' | 'past';

const useListingsApi = (listingsType: ListingsType) => {
  const [listings, setListings] = useState<Listing[] | undefined>();
  const {getMerchant} = useMerchantContext();

  useEffect(() => {
    const fetchListings = async () => {
      const merchant = await getMerchant();
      if (merchant === undefined) {
        throw new Error(USER_NOT_SIGNED_IN);
      }

      const merchantId = merchant.id.toString();
      let listings;
      if (listingsType === 'ongoing') {
        listings = await getAllListings({
          merchantId,
          listingStatus: 'ongoing',
        });
      } else {
        const listingGroups = await Promise.all(
          ['successful', 'completed', 'unsuccessful'].map(listingStatus =>
            getAllListings({merchantId, listingStatus})
          )
        );
        listings = listingGroups.flat(1);
      }
      setListings(listings);
    };
    fetchListings();
  }, [getMerchant, listingsType]);

  return {listings};
};

export default useListingsApi;
