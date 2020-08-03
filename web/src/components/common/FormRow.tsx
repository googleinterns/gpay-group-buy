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
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import styled, {css} from 'styled-components';

type FormInputStyle = 'flat' | 'shadow';

interface RowProps {
  fullWidth: boolean;
  stacked?: boolean;
}

const inlineRowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: center;
`;

const fullWidthRowStyle = css`
  min-width: 100%;
`;

const StyledRow = styled(Row)`
  margin: 5px 0;

  /* stylelint-disable value-keyword-case */
  ${({fullWidth}: RowProps) => fullWidth && fullWidthRowStyle};
  ${({stacked}: RowProps) => !stacked && inlineRowStyle};
  /* stylelint-enable value-keyword-case */
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

interface LabelProps {
  stacked?: boolean;
}

const inlineLabelStyle = css`
  width: 100px;
  height: 30px;
  margin-right: 20px;

  font-size: 14px;
  vertical-align: middle;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  /* stylelint-disable value-keyword-case */
  ${({stacked}: LabelProps) =>
    !stacked && inlineLabelStyle}/* stylelint-enable value-keyword-case */
`;

const ErrorContainer = styled.div`
  height: 12px;
  margin-left: 15px;
  margin-top: 5px;

  font-size: 12px;
  line-height: 10px;
  color: var(--bright-red);
`;

interface InputProps {
  inputWidth?: string;
  inputStyle: FormInputStyle;
}

const flatInputFieldStyle = css`
  background-color: var(--pale-gray);
  border-radius: 10px;
  color: var(--dark-gray);

  width: 100%;
  box-sizing: border-box;

  padding: 0.8em 1em;
`;

const shadowInputFieldStyle = css`
  border-radius: 15px;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);

  padding: 0.6em 1em;
`;

const inputFieldStyle = css`
  border: none;
  font-size: 1em;

  width: ${({inputWidth}: InputProps) => inputWidth || '100%'};

  /* stylelint-disable value-keyword-case */
  ${({inputStyle}: InputProps) => {
    switch (inputStyle) {
      case 'shadow':
        return shadowInputFieldStyle;
      case 'flat':
      default:
        return flatInputFieldStyle;
    }
  }};
  /* stylelint-enable value-keyword-case */
`;

const Input = styled.input`
  ${inputFieldStyle}/* stylelint-disable-line value-keyword-case */
`;

const TextArea = styled.textarea`
  ${inputFieldStyle}/* stylelint-disable-line value-keyword-case */
`;

interface FormRowProps {
  index: number;
  textAreaRows?: number;
  inputWidth?: string;
  stacked?: boolean;
  inputStyle?: FormInputStyle;
}

/**
 * FormRow is a row in a form, consisting of a label and an input field, styled according
 * to inputStyle. FormRow also contains a container for error message which is
 * displayed below the input field where applicable.
 * @param props.index The index of the row in the form
 * @param props.textAreaRows Number of rows in a textarea
 * @param props.inputWidth The fixed width of input (If undefined, input field will be full-width)
 * @param props.stacked Whether the form label would be stacked on top of form input or not
 * @param props.inputStyle The style of the input field
 */
const FormRow: React.FC<FormRowProps> = ({
  index,
  textAreaRows = 3,
  inputWidth,
  stacked = false,
  inputStyle = 'flat',
}) => {
  const {fields, errors, register, validations} = useFormPropsContext();
  const {name, label, type} = fields[index];
  return (
    <StyledRow fullWidth={inputWidth === undefined} stacked={stacked}>
      <StyledCol>
        <Label stacked={stacked}>{label}</Label>
      </StyledCol>
      <StyledCol>
        {type === 'textarea' ? (
          <TextArea
            name={name}
            rows={textAreaRows}
            ref={register(validations[name])}
            inputWidth={inputWidth}
            inputStyle={inputStyle}
          />
        ) : (
          <Input
            type={type}
            name={name}
            ref={register(validations[name])}
            inputWidth={inputWidth}
            inputStyle={inputStyle}
          />
        )}
        <ErrorContainer>{errors.form[name]?.message}</ErrorContainer>
      </StyledCol>
    </StyledRow>
  );
};
export default FormRow;
