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
import FormNumberInput from 'components/common/FormNumberInput';
import FormSelectInput from 'components/common/FormSelectInput';
import currencyCodes from 'currency-codes';
import {Controller} from 'react-hook-form';
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

const StyledFormNumberInput = styled(FormNumberInput)`
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
          as={FormSelectInput}
          name={name}
          options={currencyCodes
            .codes()
            .map(code => ({value: code, label: code}))}
          control={control}
          rules={validation}
        />
      );
    case 'whole-number':
      return (
        <Row>
          <Controller
            as={StyledFormNumberInput}
            name={name}
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
            as={StyledFormNumberInput}
            name={name}
            decimalScale={2}
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
