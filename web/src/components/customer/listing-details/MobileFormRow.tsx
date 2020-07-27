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
import Row from 'muicss/lib/react/row';
import styled, {css} from 'styled-components';

const StyledRow = styled(Row)`
  margin: 5px 0;
  min-width: 100%;
`;

const inputStyle = css`
  background-color: var(--pale-gray);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 15px;
  border: none;

  color: var(--dark-gray);
  font-size: 1em;
`;

const Input = styled.input`
  ${inputStyle}/* stylelint-disable-line value-keyword-case */
`;

const TextArea = styled.textarea`
  ${inputStyle}/* stylelint-disable-line value-keyword-case */
`;

const ErrorContainer = styled.div`
  margin-left: 15px;
  margin-top: 5px;

  font-size: 12px;
  line-height: 10px;
  color: var(--bright-red);
`;

interface FormRowProps {
  index: number;
}

/**
 * This is a row in a form, consisting of a label and an input field shown
 * side by side. This also contains a container for error message which is
 * displayed below the input field where applicable.
 */
const MobileFormRow: React.FC<FormRowProps> = ({index}) => {
  const {fields, errors, register, validations} = useFormPropsContext();
  const {name, label, type} = fields[index];
  return (
    <StyledRow>
      <label>{label}</label>
      {type === 'textarea' ? (
        <TextArea name={name} rows={3} ref={register(validations[name])} />
      ) : (
        <Input type={type} name={name} ref={register(validations[name])} />
      )}
      <ErrorContainer>{errors.form[name]?.message}</ErrorContainer>
    </StyledRow>
  );
};
export default MobileFormRow;
