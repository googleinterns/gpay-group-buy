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

import {MerchantResponse} from 'interfaces';

type MerchantType = MerchantResponse | undefined;

type ContextType =
  | {
      merchant: MerchantType;
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
 * MerchantContext provider with stateful merchant and setMerchant as its value.
 */
const MerchantProvider: React.FC = ({children}) => {
  const [merchant, setMerchant] = useState<MerchantType>(undefined);
  const value = {merchant, setMerchant};
  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  );
};

export default MerchantProvider;
export {useMerchantContext};
