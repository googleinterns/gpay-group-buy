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

import React, {Props} from 'react';

import CentralisedContainer from 'components/common/CentralisedContainer';
import styled, {AnyStyledComponent} from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled(CentralisedContainer)`
  min-width: 10%;
  width: 10%;
  margin: 0;
  padding: 0;
  margin-right: 5%;
`;

const TextContainer = styled.div`
  max-width: 90%;
  justify-content: left;
  overflow-wrap: anywhere;
`;

interface MerchantDetailRowProps {
  icon: React.FC<Props<AnyStyledComponent>>;
  text: string;
}

/**
 * This is a row that shows a field of the merchant details. It shows an icon
 * describing the field and the text showing the value of the field.
 */
const MerchantDetailRow: React.FC<MerchantDetailRowProps> = ({icon, text}) => {
  const StyledIcon = styled(icon)`
    width: 100%;
  `;
  return (
    <Row>
      <IconContainer>
        <StyledIcon />
      </IconContainer>
      <TextContainer>{text}</TextContainer>
    </Row>
  );
};

export default MerchantDetailRow;
