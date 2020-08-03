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

import CentralisedContainer from 'components/common/CentralisedContainer';
import Modal from 'components/common/Modal';
import RoundedButton from 'components/common/RoundedButton';
import CustomerFulfilmentDetailsCard from 'components/merchant/listing-details/CustomerFulfilmentDetailsCard';
import {X} from 'react-feather';
import styled from 'styled-components';

const OverlayModalCard = styled(CentralisedContainer)`
  max-width: 500px;

  background: white;
  border-radius: 20px;
  padding: 60px;

  position: relative;
`;

const CloseButton = styled(X)`
  position: absolute;
  top: 20px;
  right: 20px;

  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const TextContainer = styled.div`
  font-size: 18px;
  text-align: center;

  margin: 20px;
`;

const IndicateButton = styled(RoundedButton)`
  width: 370px;
`;

interface SendItemModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

/**
 * A modal component that displays a customer's fulfilment details and an
 * 'INDICATE ITEM SENT' button.
 */
// TODO: Handle click of 'INDICATE ITEM SENT' button.
const SendItemModal: React.FC<SendItemModalProps> = ({
  isVisible,
  closeModal,
}) => (
  <Modal isVisible={isVisible}>
    <OverlayModalCard>
      <CloseButton onClick={closeModal} />
      <Header>This customer is waiting for your item!</Header>
      <CustomerFulfilmentDetailsCard />
      <TextContainer>
        Let them know that their item is on the way by clicking this button.
      </TextContainer>
      <IndicateButton color="bright-red">Indicate item sent</IndicateButton>
    </OverlayModalCard>
  </Modal>
);

export default SendItemModal;
