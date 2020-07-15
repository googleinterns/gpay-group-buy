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

import NumberFormat, {NumberFormatProps} from 'react-number-format';

interface CustomNumberFormatProps extends NumberFormatProps {
  // This is the type of onChange function received from react-hook-form.
  onChange: (...event: any[]) => void;
}

/**
 * A form input component that allows only number input.
 */
const FormNumberInput: React.FC<CustomNumberFormatProps> = ({
  onChange,
  ...props
}) => (
  <NumberFormat
    thousandSeparator={true}
    decimalScale={0}
    isNumericString
    allowNegative={false}
    onValueChange={target => {
      if (onChange) {
        onChange(target.floatValue);
      }
    }}
    {...props}
  />
);

export default FormNumberInput;
