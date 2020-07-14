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

import styled from 'styled-components';

const Input = styled.input`
  height: 30px;
  width: 350px;
  font-size: 14px;
  padding: 0 15px;

  border-radius: 15px;
  border: none;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
`;

const TextArea = styled.textarea`
  width: 350px;
  font-size: 14px;
  line-height: 16.1px;
  padding: 5px 15px;

  border-radius: 15px;
  border: none;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
`;

interface FormInputProps {
  name: string;
  inputType: string;
  forwardedRef: ((ref: HTMLInputElement) => void) | ((ref: HTMLTextAreaElement) => void);
}

/**
 * This is an input component in a form row.
 */
const FormInput: React.FC<FormInputProps> = ({
  name,
  inputType,
  forwardedRef,
}) => {
  switch (inputType) {
    case 'textarea':
      return <TextArea name={name} rows={5} ref={forwardedRef as (ref: HTMLTextAreaElement) => void} />;
    default:
      return <Input type={inputType} name={name} ref={forwardedRef as (ref: HTMLInputElement) => void} />;
  }
};

export default FormInput;
