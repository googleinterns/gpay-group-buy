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
import currencyCodes from 'currency-codes';
import {Controller} from 'react-hook-form';
import NumberFormat from 'react-number-format';
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
    width: '180px',
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

const StyledNumberFormat = styled(NumberFormat)`
  ${inputStyles} /* stylelint-disable-line value-keyword-case */
  width: 150px;
  height: 30px;
`;

const Row = styled.div`
  width: 380px;
  height: 30px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UnitContainer = styled.div`
  width: 180px;
  text-align: left;
`;

interface FormInputProps {
  index: number;
}

/**
 * This is an input component in a form row.
 */
const FormInput: React.FC<FormInputProps> = ({index}) => {
  const {control, fields, register, watch, validations} = useFormPropsContext();
  const {name, type} = fields[index];
  const validation = validations[name];
  switch (type) {
    case 'currency':
      return (
        <Controller
          as={ReactSelect}
          name={name}
          options={currencyCodes
            .codes()
            .map(code => ({value: code, label: code}))}
          isClearable={false}
          styles={selectStyles}
          theme={selectTheme}
          control={control}
          rules={validation}
        />
      );
    case 'whole-number':
      return (
        <Row>
          <Controller
            as={StyledNumberFormat}
            name={name}
            thousandSeparator={true}
            decimalScale={0}
            isNumericString
            allowNegative={false}
            control={control}
            rules={validation}
          />
          <UnitContainer>people</UnitContainer>
        </Row>
      );
    case 'money':
      return (
        <Row>
          <Controller
            as={StyledNumberFormat}
            name={name}
            thousandSeparator={true}
            decimalScale={2}
            isNumericString
            allowNegative={false}
            control={control}
            rules={validation}
          />
          <UnitContainer>{watch && watch('currency')?.value}</UnitContainer>
        </Row>
      );
    case 'textarea':
      return <TextArea name={name} rows={3} ref={register(validation)} />;
    default:
      return <Input type={type} name={name} ref={register(validation)} />;
  }
};

export default FormInput;
