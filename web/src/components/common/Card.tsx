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

import CardImage from 'components/common/CardImage';
import {Image} from 'interfaces';
import styled from 'styled-components';

const DEFAULT_IMG_WIDTH = '150px';

interface CardContainerProps {
  horizontal?: boolean;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: ${({horizontal}: CardContainerProps) =>
    horizontal ? 'row' : 'column'};

  background: white;
  margin: 0.6em;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const CardContent = styled.div`
  padding: 0.8em;
  flex-grow: 1;
`;

interface CardProps {
  img?: Image;
  horizontal?: boolean;
}

/**
 * A base Card component that takes in images.
 */
const Card: React.FC<CardProps> = ({img, horizontal, children}) => (
  <CardContainer horizontal={horizontal}>
    {img !== undefined && (
      <ImageContainer>
        <CardImage
          img={img}
          width={horizontal ? DEFAULT_IMG_WIDTH : undefined}
          height={horizontal ? '100%' : undefined}
        />
      </ImageContainer>
    )}
    <CardContent>{children}</CardContent>
  </CardContainer>
);

export default Card;
