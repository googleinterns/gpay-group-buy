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

import React, {useContext} from 'react';

import {Commit} from 'interfaces';

type ContextType = Commit[] | undefined;

const PaidCustomerCollectionContext = React.createContext<ContextType>(
  undefined
);

/**
 * usePaidCustomerCollectionContext hook that ensures it is used within a PaidCustomerCollectionProvider.
 */
const usePaidCustomerCollectionContext = () => {
  const context = useContext(PaidCustomerCollectionContext);
  if (context === undefined) {
    throw new Error(
      'usePaidCustomerCollectionContext must be used within a PaidCustomerCollectionProvider'
    );
  }
  return context;
};

export default PaidCustomerCollectionContext.Provider;
export {usePaidCustomerCollectionContext};
