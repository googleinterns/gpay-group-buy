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

import {FormInputRef} from 'components/common/interfaces';
import currencyCodes from 'currency-codes';
import {Controller, useForm} from 'react-hook-form';
import ReactSelect, {Props, Styles, Theme} from 'react-select';
import styled from 'styled-components';

const inputStyles = `
  width: 350px;
  padding: 0 15px;
  border-radius: 15px;
  border: none;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
`;

// Stylelint is disabled because the specified rule should not apply to non-string.
const Input = styled.input`
  ${inputStyles} /* stylelint-disable-line value-keyword-case */
  height: 30px;
`;

const TextArea = styled.textarea`
  ${inputStyles} /* stylelint-disable-line value-keyword-case */
  width: 350px;
  line-height: 16.1px;
  padding-top: 7px;
  padding-bottom: 7px;
`;

const selectStyles: Styles = {
  control: (provided: Props) => ({
    ...provided,
    'min-height': '30px', // This is to override existing style.
    height: '30px',
    width: '380px',
    padding: '0 15px',
    'border-radius': '15px',
    border: 'none',
    'box-shadow': '4px 2px 4px rgba(0, 0, 0, 0.25)',
    'font-size': '14px',
  }),
  indicatorsContainer: (provided: Props) => ({
    ...provided,
    height: '30px',
  }),
  placeholder: (provided: Props) => ({
    ...provided,
    margin: '0',
  }),
  singleValue: (provided: Props) => ({
    ...provided,
    margin: '0',
  }),
  valueContainer: (provided: Props) => ({
    ...provided,
    height: '30px',
    padding: '0',
  }),
};

const selectTheme = (theme: Theme) => ({
  ...theme,
  borderRadius: '15px',
  colors: {
    ...theme.colors,
    primary: 'var(--green)',
    primary75: 'var(--mint)',
    primary50: 'var(--light-green)',
    primary25: 'var(--pale-green)',
    danger: 'var(red)',
  },
});

interface FormInputProps {
  name: string;
  inputType: string;
  step?: string;
  forwardedRef: FormInputRef;
}

/**
 * This is an input component in a form row.
 */
const FormInput: React.FC<FormInputProps> = ({
  name,
  inputType,
  forwardedRef,
  step,
}) => {
  const {control} = useForm();
  switch (inputType) {
    case 'currency':
      return (
        <Controller
          as={ReactSelect}
          name={name}
          options={currencyCodes
            .codes()
            .map(code => ({value: code, label: code}))}
          styles={selectStyles}
          theme={selectTheme}
          control={control}
          ref={forwardedRef as (ref: HTMLSelectElement) => void}
        />
      );
    case 'textarea':
      return (
        <TextArea
          name={name}
          rows={3}
          ref={forwardedRef as (ref: HTMLTextAreaElement) => void}
        />
      );
    default:
      return (
        <Input
          type={inputType}
          name={name}
          step={step}
          ref={forwardedRef as (ref: HTMLInputElement) => void}
        />
      );
  }
};

export default FormInput;
