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

import Container from 'muicss/lib/react/container';
import styled from 'styled-components';

type ModalBackgroundProps = {
  isVisible: boolean;
};

const ModalBackground = styled(Container)`
  display: ${({isVisible}: ModalBackgroundProps) =>
    isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Ensure always on top */

  background: rgba(0, 0, 0, 0.5);
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

interface ModalProps {
  isVisible: boolean;
}

/**
 * A modal component that can be shown/hidden through a stateful isVisible variable.
 */
const Modal: React.FC<ModalProps> = ({children, isVisible}) => {
  useEffect(() => {
    if (isVisible) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [isVisible]);

  useEffect(enableBodyScroll, []);

  return (
    <ModalBackground isVisible={isVisible} fluid>
      {children}
    </ModalBackground>
  );
};

export default Modal;
