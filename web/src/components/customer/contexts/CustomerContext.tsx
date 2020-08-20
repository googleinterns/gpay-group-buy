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
import {Customer, CustomerIdentity} from 'interfaces';
import {getIdentity, getPhoneNumber} from 'microapps';

interface AuthenticatedCustomer {
  customer: Customer | undefined;
  idToken: string | undefined;
}

type ContextType =
  | {
      identity: CustomerIdentity | undefined;
      customer: Customer | undefined;
      getCustomerWithLogin: () => Promise<AuthenticatedCustomer>;
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

  const [identity, setIdentity] = useState<CustomerIdentity>();

  const [customer, setCustomer] = useState<Customer>();

  const login = useCallback(async (): Promise<AuthenticatedCustomer> => {
    const identity = await getIdentity();
    const gpayContactNumber = await getPhoneNumber();
    if (identity === undefined || gpayContactNumber === undefined) {
      return {customer: undefined, idToken: undefined};
    }

    const {idToken, decodedToken} = identity;
    setIdentity({idToken, decodedToken});

    const {sub: gpayId} = decodedToken;
    const customer = await loginCustomer({gpayId, gpayContactNumber}, idToken);
    setCustomer(customer);
    setIsExistingCustomer(true);

    return {customer, idToken};
  }, [setIsExistingCustomer]);

  useEffect(() => {
    if (isExistingCustomer) {
      login();
    }
  }, [isExistingCustomer, login]);

  useEffect(() => {
    if (identity === undefined) {
      setCustomer(undefined);
    }
  }, [identity, login]);

  /**
   * Gets current customer. Attempts a login if customer is undefined.
   */
  const getCustomerWithLogin = async (): Promise<AuthenticatedCustomer> => {
    if (customer === undefined) {
      return login();
    }
    return {customer, idToken: identity?.idToken};
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
    identity,
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
