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

import React, {useContext, MouseEventHandler} from 'react';

import {
  Control,
  FieldElement,
  FieldErrors,
  FieldValues,
  ValidationOptions,
} from 'react-hook-form';

interface Errors {
  form: FieldErrors<FieldValues>;
  general: Error | undefined;
}

interface Field {
  label: string;
  name: string;
  type: string;
  defaultValue?: string | number;
}

type ContextType =
  | {
      buttonText: string;
      control?: Control<FieldValues>;
      disabled: boolean;
      errors: Errors;
      fields: Field[];
      onSubmit: MouseEventHandler<HTMLButtonElement>;
      register: (
        validationOptions: ValidationOptions
      ) => (ref: FieldElement<FieldValues> | null) => void;
      validations: {[key: string]: ValidationOptions};
    }
  | undefined;

const FormPropsContext = React.createContext<ContextType>(undefined);

/**
 * useContext hook that ensures it is used within a FormPropsProvider.
 */
const useFormPropsContext = () => {
  const context = useContext(FormPropsContext);
  if (context === undefined) {
    throw new Error(
      'useFormPropsContext must be used within a FormPropsProvider'
    );
  }
  return context;
};

/**
 * FormPropsContext provider that passes value given to FormRow and FormInput components.
 */
const FormPropsProvider: React.FC<ContextType> = ({children, ...props}) => {
  return (
    <FormPropsContext.Provider value={props}>
      {children}
    </FormPropsContext.Provider>
  );
};

export default FormPropsProvider;
export {useFormPropsContext};
