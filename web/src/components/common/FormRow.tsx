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

import Row from 'muicss/lib/react/row';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 20px 0;
`;

const Label = styled.label`
  width: 100px;
  font-size: 14px;
  margin-right: 20px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 14px;
  padding: 0 15px;

  border-radius: 15px;
  border: none;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
`;

interface FormRowProps {
  label: string;
  inputType: string;
}

/**
 * This is a row in a form, consisting of a label and an input field shown
 * side by side.
 */
const FormRow: React.FC<FormRowProps> = ({label, inputType}) => (
  <StyledRow>
    <Label>{label}</Label>
    <Input type={inputType}></Input>
  </StyledRow>
);

export default FormRow;
