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

import Select, {OptionTypeBase, Props, Styles, Theme} from 'react-select';

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

const selectTheme = (theme: Theme): Theme => ({
  ...theme,
  borderRadius: 15,
  colors: {
    ...theme.colors,
    primary: 'var(--green)',
    primary75: 'var(--mint)',
    primary50: 'var(--light-green)',
    primary25: 'var(--pale-green)',
    danger: 'var(red)',
  },
});

/**
 * A form input component that has a drop-down list.
 */
const FormSelectInput: React.FC<OptionTypeBase> = (props) => (
  <Select
    isClearable={false}
    styles={selectStyles}
    theme={selectTheme}
    {...props}
  />
);

export default FormSelectInput;
