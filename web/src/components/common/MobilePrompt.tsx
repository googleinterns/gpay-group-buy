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

import Modal from 'components/common/Modal';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

const OverlayPromptCard = styled(Container)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;

  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
`;

const PromptContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 18px;

  & > p {
    text-align: center;
  }

  & > * {
    margin: 6px 0 6px 0;
  }
`;

const TitleText = styled.span`
  max-width: 70%;

  font-weight: bolder;
  font-size: 1.2rem;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: row wrap;
  justify-content: flex-end;

  width: 100%;
`;

const LinkButton = styled(Button)`
  display: flex;
  align-items: center;

  padding: 12px;
  min-height: 40px;
  min-width: 40px;

  font-weight: bold;

  && {
    color: var(--green);
    background: none;
  }
`;

interface ButtonDetails {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

interface MobilePromptProps {
  isVisible: boolean;
  title: string;
  buttons: ButtonDetails[];
  header?: JSX.Element;
}

/**
 * A prompt component optimised for mobile view.
 * To dismiss the prompt, it is important to set isVisible to false for the same prompt.
 */
const MobilePrompt: React.FC<MobilePromptProps> = ({
  children,
  isVisible,
  title,
  buttons,
  header,
}) => (
  <Modal isVisible={isVisible}>
    <OverlayPromptCard fluid>
      <PromptContent>
        {header}
        {title && <TitleText>{title}</TitleText>}
        {children}
      </PromptContent>
      <ButtonRow>
        {buttons.map(({name, onClick, disabled = false}, idx) => (
          <LinkButton
            key={idx}
            onClick={onClick}
            disabled={disabled}
            variant="flat"
          >
            {name}
          </LinkButton>
        ))}
      </ButtonRow>
    </OverlayPromptCard>
  </Modal>
);

export default MobilePrompt;
