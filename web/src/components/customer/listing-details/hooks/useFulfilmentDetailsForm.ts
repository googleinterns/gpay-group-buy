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

import {useCustomerContext} from 'components/customer/contexts/CustomerContext';
import {useCommitContext} from 'components/customer/listing-details/contexts/CommitContext';
import {FulfilmentDetails, DecodedIdentityToken} from 'interfaces';
import {decodeToken} from 'microapps';
import {useForm} from 'react-hook-form';
import {getNationalNumber} from 'utils/phone-number';

interface FulFilmentDetailsSubmittedValues extends FulfilmentDetails {
  setDefault: boolean;
}

/**
 * useFulfilmentDetailsForm that contains all the logic and details concering
 * the Fulfilment Details form.
 */
const useFulfilmentDetailsForm = () => {
  const {formState, handleSubmit, register} = useForm<
    FulFilmentDetailsSubmittedValues
  >({
    mode: 'onChange',
  });
  const {onPayment} = useCommitContext();
  const {customer, idToken} = useCustomerContext();

  const customerName =
    idToken !== undefined
      ? (decodeToken(idToken) as DecodedIdentityToken).name
      : '';

  const fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      defaultValue: customer?.defaultFulfilmentDetails.name || customerName,
    },
    {
      label: 'Contact Number',
      name: 'contactNumber',
      type: 'number',
      defaultValue:
        customer &&
        getNationalNumber(
          customer.defaultFulfilmentDetails.contactNumber ||
            customer.gpayContactNumber
        ),
    },
    {
      label: 'Delivery Address',
      name: 'address',
      type: 'textarea',
      defaultValue: customer?.defaultFulfilmentDetails.address,
    },
    {
      label: 'Use as default',
      name: 'setDefault',
      type: 'checkbox',
    },
  ];

  const validations = {
    name: {
      required: true,
    },
    contactNumber: {
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    address: {
      required: true,
    },
  };
  const disabled = !formState.isValid;

  const onSubmit = handleSubmit(
    async (values: FulFilmentDetailsSubmittedValues) => {
      const {setDefault, ...fulfilmentDetails} = values;
      return onPayment(fulfilmentDetails, setDefault);
    }
  );

  return {
    fields,
    disabled,
    errors: {
      form: {},
      general: undefined,
    },
    onSubmit,
    register,
    validations,
  };
};

export default useFulfilmentDetailsForm;
