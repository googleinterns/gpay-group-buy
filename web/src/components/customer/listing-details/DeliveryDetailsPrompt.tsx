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

import React from 'react';

import {useFormPropsContext} from 'components/common/contexts/FormPropsContext';
import MobilePrompt from 'components/common/MobilePrompt';
import {useDeliveryDetailsPromptContext} from 'components/customer/listing-details/contexts/DeliveryDetailsPromptContext';
import MobileFormRow from 'components/customer/listing-details/MobileFormRow';

import {ReactComponent as DeliverySvg} from 'assets/customer/delivery.svg';

/**
 * DeliveryDetailsPrompt that shows the delivery details prompt.
 */
const DeliveryDetailsPrompt: React.FC = () => {
  const {isPromptVisible, onClose} = useDeliveryDetailsPromptContext();

  const {fields, disabled, onSubmit} = useFormPropsContext();

  const onClickSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onSubmit(event);
    onClose();
  };

  return (
    <MobilePrompt
      title="Please fill in your delivery details."
      header={<DeliverySvg />}
      isVisible={isPromptVisible}
      buttons={[
        {
          name: 'Back',
          onClick: onClose,
        },
        {
          name: 'Confirm',
          onClick: onClickSubmit,
          disabled,
        },
      ]}
    >
      {fields.map((_, index) => (
        <MobileFormRow index={index} key={index} />
      ))}
    </MobilePrompt>
  );
};

export default DeliveryDetailsPrompt;
