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

import {useState} from 'react';

import {addListing} from 'api';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import {getFirebaseIdToken} from 'firebase-auth';
import {ListingPayload} from 'interfaces';
import {useHistory} from 'react-router-dom';
import {parseMoney} from 'utils/money';

const DUMMY_LISTING_VALUES = {
  name: 'Drone',
  currency: 'INR',
  price: 27000,
  oldPrice: 37000,
  imgUrl: 'https://images.unsplash.com/photo-1557343569-b1d5b655b7cb',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  deadline: '08/08/2020',
  minCommits: 20,
};

interface AddListingData {
  name: string;
  currency: string; // The 3-letter currency code defined in ISO 4217
  price: number;
  oldPrice: number;
  imgUrl: string;
  description: string;
  deadline: string; // RFC 3339 string
  minCommits: number;
}

/**
 * This custom hook handles adding listing to database upon clicking 'ADD LISTING' button.
 */
const useFormSubmit = (values: AddListingData = DUMMY_LISTING_VALUES) => {
  const [generalError, setGeneralError] = useState<Error | undefined>();
  const {getMerchant} = useMerchantContext();
  const history = useHistory();

  const formatAddListingData = async (
    values: AddListingData
  ): Promise<ListingPayload> => {
    const {
      currency,
      price: priceValue,
      oldPrice: oldPriceValue,
      ...rest
    } = values;
    const merchant = await getMerchant();

    if (merchant === undefined) {
      throw new Error(USER_NOT_SIGNED_IN);
    }

    const listingPayload: ListingPayload = {
      ...rest,
      price: parseMoney(priceValue, currency),
      oldPrice: parseMoney(oldPriceValue, currency),
      merchantId: merchant.id,
    };
    return listingPayload;
  };

  const handleSubmit = async () => {
    setGeneralError(undefined); // Reset general error message.

    try {
      const listingPayload = await formatAddListingData(values);
      const firebaseIdToken = await getFirebaseIdToken();
      await addListing(listingPayload, firebaseIdToken);
      history.push('home');
    } catch (err) {
      setGeneralError(err);
    }
  };

  return {
    generalError,
    handleSubmit,
  };
};

export default useFormSubmit;
