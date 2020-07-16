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

import Button from 'muicss/lib/react/button';
import styled from 'styled-components';

const BUTTON_FONT_COLORS: {[key: string]: string} = {
  'bright-red': 'white',
  'dark-gray': 'white',
  green: 'white',
  'pale-green': 'var(--green)',
  'pale-gray': 'var(--gray)',
};

/**
 * Button with dark gray background, white uppercase fonts and rounder corners.
 */
const RoundedButton = styled(Button)`
  height: 40px;
  width: 200px;
  border-radius: 20px;
  border: none;

  background: var(
    --${props => {
        return props.color && props.color in BUTTON_FONT_COLORS
          ? props.color
          : 'dark-gray';
      }}
  );
  color: ${props => {
    return props.color && props.color in BUTTON_FONT_COLORS
      ? BUTTON_FONT_COLORS[props.color]
      : 'white';
  }};
  font-size: 18px;
  font-weight: bolder;
  text-transform: uppercase;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default RoundedButton;
