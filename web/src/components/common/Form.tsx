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
import FormRow from 'components/common/FormRow';
import RoundedButton from 'components/common/RoundedButton';
import MuiForm from 'muicss/lib/react/form';
import styled from 'styled-components';

const StyledForm = styled(MuiForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorContainer = styled.div`
  color: var(--bright-red);
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * This form contains all the fields to be filled in and a button to submit the data.
 */
const Form: React.FC = () => {
  const {
    buttonText,
    disabled,
    errors,
    fields,
    onSubmit,
  } = useFormPropsContext();
  return (
    <StyledForm>
      {fields.map((_, index) => (
        <FormRow index={index} key={index} />
      ))}
      <ErrorContainer>{errors.general?.message}</ErrorContainer>
      <RoundedButton onClick={onSubmit} disabled={disabled}>
        {buttonText}
      </RoundedButton>
    </StyledForm>
  );
};

export default Form;
