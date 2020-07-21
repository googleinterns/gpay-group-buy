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
import {AddListingFormData, ListingPayload} from 'interfaces';
import {useHistory} from 'react-router-dom';
import {parseMoney} from 'utils/money';

/**
 * This custom hook handles adding listing to database upon clicking 'ADD LISTING' button.
 */
const useFormSubmit = () => {
  const [generalError, setGeneralError] = useState<Error | undefined>();
  const {getMerchant} = useMerchantContext();
  const history = useHistory();

  const formatAddListingData = async (
    values: AddListingFormData
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
      price: parseMoney(priceValue, currency || 'INR'),
      oldPrice: parseMoney(oldPriceValue, currency || 'INR'),
      merchantId: merchant.id,
    };
    return listingPayload;
  };

  const submitAddListingFormData = async (values: AddListingFormData) => {
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
    submitAddListingFormData,
  };
};

export default useFormSubmit;
