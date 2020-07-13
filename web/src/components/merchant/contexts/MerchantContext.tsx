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

import {NO_MERCHANT_WITH_FIREBASE_UID} from 'constants/errors/server-errors';
import {USER_NOT_SIGNED_IN} from 'constants/errors/sign-in-errors';

import React, {useContext, useState, Dispatch, SetStateAction} from 'react';

import {getMerchantWithFirebaseUid} from 'api';
import {getFirebaseUid} from 'firebase-auth';
import {MerchantResponse} from 'interfaces';
import {useHistory} from 'react-router-dom';

type MerchantType = MerchantResponse | undefined;

type ContextType =
  | {
      getMerchant: () => Promise<MerchantType>;
      setMerchant: Dispatch<SetStateAction<MerchantType>>;
    }
  | undefined;

const MerchantContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a MerchantContext.
 */
const useMerchantContext = () => {
  const context = useContext(MerchantContext);
  if (context === undefined) {
    throw new Error(
      'useMerchantContext must be used within a MerchantProvider'
    );
  }

  return context;
};

/**
 * MerchantContext provider with merchant getter and setter functions as its value.
 */
const MerchantProvider: React.FC = ({children}) => {
  const [merchant, setMerchant] = useState<MerchantType>(undefined);
  const history = useHistory();

  // Returns merchant stored in the context state if not undefined, otherwise
  // fetch merchant from server and update context state.
  const getMerchant = async () => {
    if (merchant === undefined) {
      try {
        const firebaseUid = await getFirebaseUid(); // Throws 'User not signed in' error.
        const result = await getMerchantWithFirebaseUid(firebaseUid);
        setMerchant(result);
      } catch (err) {
        if (
          err.message === USER_NOT_SIGNED_IN ||
          err.message === NO_MERCHANT_WITH_FIREBASE_UID
        ) {
          history.push('sign-in');
          return;
        }

        throw err;
      }
    }

    return merchant;
  };

  const value = {getMerchant, setMerchant};
  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  );
};

export default MerchantProvider;
export {useMerchantContext};
