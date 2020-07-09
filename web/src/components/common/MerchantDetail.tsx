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

import React, {ReactNode} from 'react';

import CentralisedContainer from 'components/common/CentralisedContainer';
import MuiRow from 'muicss/lib/react/row';
import styled from 'styled-components';

const Row = styled(MuiRow)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled(CentralisedContainer)`
  width: 10%;
  margin-right: 3%;
`;

const TextContainer = styled.div`
  width: 100%;
  justify-content: left;
  overflow-wrap: anywhere;
`;

interface MerchantDetailProps {
  icon: ReactNode;
  text: string;
}

/**
 * This is a row that shows a field of the merchant details. It shows an icon
 * describing the field and the text showing the value of the field.
 */
const MerchantDetail: React.FC<MerchantDetailProps> = ({icon, text}) => (
  <Row>
    <IconContainer>{icon}</IconContainer>
    <TextContainer>{text}</TextContainer>
  </Row>
);

export default MerchantDetail;
