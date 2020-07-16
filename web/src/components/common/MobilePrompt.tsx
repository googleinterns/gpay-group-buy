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

import React, {useEffect} from 'react';

import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

type PromptBackgroundProps = {
  isVisible: boolean;
};

const PromptBackground = styled(Container)`
  display: ${({isVisible}: PromptBackgroundProps) =>
    isVisible ? 'block' : 'none'};

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Ensure always on top */

  background: rgba(0, 0, 0, 0.5);
`;

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
  }
`;

/* Prevent body scroll code from https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/ */
const disableBodyScroll = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
};

const enableBodyScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};
/* End prevent body scroll code from https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/ */

interface ButtonDetails {
  name: string;
  onClick: () => void;
}

interface MobilePromptProps {
  isVisible: boolean;
  title?: string;
  header?: JSX.Element;
  buttons?: ButtonDetails[];
}

/**
 * A prompt component optimised for mobile view.
 */
const MobilePrompt: React.FC<MobilePromptProps> = ({
  children,
  isVisible,
  title,
  header,
  buttons,
}) => {
  useEffect(() => {
    if (isVisible) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [isVisible]);

  useEffect(enableBodyScroll, []);

  return (
    <PromptBackground isVisible={isVisible} fluid>
      <OverlayPromptCard fluid>
        <PromptContent>
          {header}
          {title && <TitleText>{title}</TitleText>}
          {children}
        </PromptContent>
        <ButtonRow>
          {buttons?.map(({name, onClick}, idx) => (
            <LinkButton key={idx} onClick={onClick} variant="flat">
              {name}
            </LinkButton>
          ))}
        </ButtonRow>
      </OverlayPromptCard>
    </PromptBackground>
  );
};

export default MobilePrompt;
