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

import CentralisedContainer from 'components/common/CentralisedContainer';
import Button from 'muicss/lib/react/button';
import styled from 'styled-components';

const ErrorContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 6px 0 6px 0;
  }
`;

const TitleText = styled.h2`
  max-width: 70%;

  font-weight: bolder;
  font-size: 1.18rem;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  padding: 0 2em;
  min-width: 40px;
  border-radius: 999px; /* Ensure pill shape */

  font-weight: bold;
  text-transform: capitalize;

  && {
    color: var(--green);
    border: 1px solid var(--green);
  }
`;

interface ButtonDetails {
  name: string;
  onClick: () => void | Promise<void>;
}

interface ErrorDisplayProps {
  title: string;
  button?: ButtonDetails;
  header?: JSX.Element;
  className?: string; // Prop passed by styled-components wrapper
}

/**
 * An Error Display component that displays the error in a centralised component.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  children,
  title,
  button,
  header,
  className,
}) => (
  <CentralisedContainer className={className}>
    <ErrorContent>
      {header}
      {title && <TitleText>{title}</TitleText>}
      {children}
    </ErrorContent>
    {button && (
      <ButtonRow>
        <StyledButton onClick={button.onClick} variant="flat">
          {button.name}
        </StyledButton>
      </ButtonRow>
    )}
  </CentralisedContainer>
);

export default ErrorDisplay;
