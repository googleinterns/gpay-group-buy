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

import React, {MouseEventHandler} from 'react';

import FormRow from 'components/common/FormRow';
import Button from 'muicss/lib/react/button';
import MuiForm from 'muicss/lib/react/form';
import {FieldErrors, FieldValues} from 'react-hook-form';
import styled from 'styled-components';

const StyledForm = styled(MuiForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 200px;
  border-radius: 20px;
  border: none;

  background: var(--dark-gray);
  color: white;
  font-size: 18px;
  font-weight: bolder;
  text-transform: uppercase;
`;

const ErrorContainer = styled.div`
  color: var(--bright-red);
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface Errors {
  form: FieldErrors<FieldValues>;
  general: Error;
}

interface Field {
  label: string;
  name: string;
  type: string;
}

interface FormProps {
  buttonText: string;
  disabled: boolean;
  errors: Errors;
  fields: Field[];
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  validations: {[key: string]: (ref: HTMLInputElement) => void};
}

/**
 * This form contains all the fields to be filled in and a button to submit the data.
 */
const Form: React.FC<FormProps> = ({
  buttonText,
  disabled,
  errors,
  fields,
  onSubmit,
  validations,
}) => {
  return (
    <StyledForm>
      {fields.map((field, key) => {
        const {name, label, type} = field;
        return (
          <FormRow
            name={name}
            label={label}
            inputType={type}
            forwardedRef={validations[name]}
            error={errors.form[name]?.message}
            key={key}
          />
        );
      })}
      <ErrorContainer>{errors.general?.message}</ErrorContainer>
      <StyledButton onClick={onSubmit} disabled={disabled}>
        {buttonText}
      </StyledButton>
    </StyledForm>
  );
};

export default Form;
