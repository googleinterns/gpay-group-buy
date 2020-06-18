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

import {Image} from 'interfaces';
import styled from 'styled-components';

const MIN_IMG_HEIGHT = '120px';

interface CardContainerProps {
  width?: string;
  height?: string;
}

const ImageContainer = styled.div`
  width: ${({width}: CardContainerProps) => width || '100%'};
  min-height: ${MIN_IMG_HEIGHT};
  height: ${({height}: CardContainerProps) => height || MIN_IMG_HEIGHT};
`;

const StyledCardImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  background-color: var(--light-gray);
`;

interface CardImageProps {
  img: Image;
  width?: string;
  height?: string;
}

const CardImage: React.FC<CardImageProps> = ({img, width, height}) => (
  <ImageContainer width={width} height={height}>
    <StyledCardImage src={img.url} alt={img.alt || 'Card Image'} />
  </ImageContainer>
);

export default CardImage;
