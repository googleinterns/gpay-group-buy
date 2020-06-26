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

import {Component, ReactElement} from 'react';
import React from 'react';

import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import styled from 'styled-components';
import toCamelCase from 'to-camel-case';

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: center;

  margin: 5px 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Label = styled.label`
  width: 100px;
  height: 30px;
  margin-right: 20px;

  font-size: 14px;
  vertical-align: middle;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  height: 30px;
  width: 350px;
  font-size: 14px;
  padding: 0 15px;

  border-radius: 15px;
  border: none;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
`;

const ErrorContainer = styled.div`
  height: 12px;
  margin-left: 15px;
  margin-top: 5px;

  font-size: 12px;
  line-height: 10px;
  color: var(--bright-red);
`;

type ReactHookFormErrorMessage =
  | string
  | React.ReactElement<
      any,
      | string
      | ((
          props: any
        ) => React.ReactElement<
          any,
          string | any | (new (props: any) => React.Component<any, any, any>)
        > | null)
      | (new (props: any) => React.Component<any, any, any>)
    >
  | undefined;

interface FormRowProps {
  label: string;
  inputType: string;
  forwardedRef: (ref: HTMLInputElement) => void;
  error: ReactHookFormErrorMessage;
}

/**
 * This is a row in a form, consisting of a label and an input field shown
 * side by side. This also contains a container for error message which is
 * displayed below the input field where applicable.
 */
const FormRow: React.FC<FormRowProps> = ({
  label,
  inputType,
  forwardedRef,
  error,
}) => (
  <StyledRow>
    <StyledCol>
      <Label>{label}</Label>
    </StyledCol>
    <StyledCol>
      <Input type={inputType} name={toCamelCase(label)} ref={forwardedRef} />
      <ErrorContainer>{error}</ErrorContainer>
    </StyledCol>
  </StyledRow>
);

export default FormRow;
