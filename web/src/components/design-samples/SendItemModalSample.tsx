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

import React, {useState} from 'react';

import SendItemModal from 'components/merchant/listing-details/SendItemModal';
import Button from 'muicss/lib/react/button';

/**
 * SendItemModalSample that shows how the SendItemModal looks like.
 */
const SendItemModalSample: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickOpen = () => setIsVisible(true);
  const onClickClose = () => setIsVisible(false);

  return (
    <>
      <Button onClick={onClickOpen} color="primary">
        Open Modal
      </Button>
      <SendItemModal isVisible={isVisible} closeModal={onClickClose} />
    </>
  );
};

export default SendItemModalSample;
