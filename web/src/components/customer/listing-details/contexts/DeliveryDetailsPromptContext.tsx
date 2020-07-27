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

import React, {useContext, useState} from 'react';

import FormPropsProvider from 'components/common/contexts/FormPropsContext';
import useDeliveryDetailsForm from 'components/customer/listing-details/hooks/useDeliveryDetailsForm';

type ContextType =
  | {
      isPromptVisible: boolean;
      onClose: () => void;
      onOpen: () => void;
    }
  | undefined;

const DeliveryDetailsPromptContext = React.createContext<ContextType>(
  undefined
);

/**
 * useContext hook that ensures it is used within a CommitFeedbackPromptProvider.
 */
const useDeliveryDetailsPromptContext = () => {
  const context = useContext(DeliveryDetailsPromptContext);
  if (context === undefined) {
    throw new Error(
      'useDeliveryDetailsPromptContext must be used within a DeliveryDetailsPromptProvider'
    );
  }
  return context;
};

/**
 * DeliveryDetailsPromptProvider with stateful promptContent and isPromptVisible.
 */
const DeliveryDetailsPromptProvider: React.FC = ({children}) => {
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const onClose = () => {
    setIsPromptVisible(false);
  };

  const onOpen = () => {
    setIsPromptVisible(true);
  };

  const value = {
    isPromptVisible,
    onClose,
    onOpen,
  };

  return (
    <DeliveryDetailsPromptContext.Provider value={value}>
      <FormPropsProvider
        buttonText="Confirm"
        fields={[
          {label: 'Contact Number', name: 'deliveryContactNumber', type: 'number'},
          {
            label: 'Delivery Address',
            name: 'deliveryAddress',
            type: 'textarea',
          },
        ]}
        {...useDeliveryDetailsForm()}
      >
        {children}
      </FormPropsProvider>
    </DeliveryDetailsPromptContext.Provider>
  );
};

export default DeliveryDetailsPromptProvider;
export {useDeliveryDetailsPromptContext};
