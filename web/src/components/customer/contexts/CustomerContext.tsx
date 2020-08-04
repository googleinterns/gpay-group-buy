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

import React, {useContext, useState, useEffect, useCallback} from 'react';

import {getCustomer as fetchCustomer, loginCustomer} from 'api';
import useLocalStorage from 'components/common/hooks/useLocalStorage';
import {Customer} from 'interfaces';
import {getIdentity} from 'microapps';

type ContextType =
  | {
      idToken: string | undefined;
      customer: Customer | undefined;
      getCustomerWithLogin: () => Promise<Customer | undefined>;
      refetchCustomer: () => Promise<void>;
    }
  | undefined;

const CustomerContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a CustomerProvider.
 */
const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error(
      'useCommitCountContext must be used within a CustomerProvider'
    );
  }
  return context;
};

/**
 * CustomerProvider provider with stateful customer info.
 */
const CustomerProvider: React.FC = ({children}) => {
  const [isExistingCustomer, setIsExistingCustomer] = useLocalStorage<boolean>(
    'isExistingCustomer',
    false
  );

  const [idToken, setIdToken] = useState<string>();

  const [customer, setCustomer] = useState<Customer>();

  const login = useCallback(async () => {
    const {
      idToken,
      decodedToken: {sub: gpayId},
    } = await getIdentity();
    setIdToken(idToken);

    const customer = await loginCustomer({gpayId}, idToken);
    setCustomer(customer);
    setIsExistingCustomer(true);
  }, [setIsExistingCustomer]);

  useEffect(() => {
    if (isExistingCustomer) {
      login();
    }
  }, [isExistingCustomer, login]);

  useEffect(() => {
    if (idToken === undefined) {
      setCustomer(undefined);
    }
  }, [idToken, login]);

  /**
   * Gets current customer. Attempts a login if customer is undefined.
   * @param attemptLogin Whether to attempt a login when customer is undefined
   */
  const getCustomerWithLogin = async () => {
    if (customer === undefined) {
      await login();
    }
    return customer;
  };

  /**
   * Refetches new customer data.
   * If customer is undefined, triggers a login.
   */
  const refetchCustomer = async () => {
    if (customer === undefined) {
      await login();
      return;
    }

    const newCustomerData = await fetchCustomer(customer.id);
    setCustomer(newCustomerData);
  };

  const value = {
    idToken,
    customer,
    getCustomerWithLogin,
    refetchCustomer,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
export {useCustomerContext};
