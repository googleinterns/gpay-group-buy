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

import Button from 'muicss/lib/react/button';
import {ButtonProps} from 'muicss/react';
import {ChevronLeft} from 'react-feather';
import styled, {css} from 'styled-components';

type PosType = 'absolute' | 'static';

const AbsolutePosStyle = css`
  position: absolute;
  top: 15px;
  left: 0;
  z-index: 999; /* Ensure always on top */
`;

const StaticPosStyle = css``;

const StyledBackButton = styled(Button)`
  display: flex;
  flex-flow: row;
  align-items: center;

  padding-left: 15px;
  border-radius: 0 999px 999px 0; /* Ensure pill shape on right end */

  && {
    background: var(--green);
    color: white;

    :focus {
      background: var(--green);
      color: white;
    }
  }

  /* stylelint-disable value-keyword-case */
  ${({pos}: BackButtonProps) => {
    switch (pos) {
      case 'absolute':
        return AbsolutePosStyle;
      case 'static':
        return StaticPosStyle;
      default:
        return StaticPosStyle;
    }
  }};
  /* stylelint-enable value-keyword-case */
`;

interface BackButtonProps extends ButtonProps {
  pos?: PosType;
}

/**
 * BackButton component with either static or absolute position.
 */
const BackButton: React.FC<BackButtonProps> = ({
  pos = 'static',
  ...buttonProps
}) => (
  <StyledBackButton variant="flat" pos={pos} {...buttonProps}>
    <ChevronLeft />
    Back
  </StyledBackButton>
);

export default BackButton;
