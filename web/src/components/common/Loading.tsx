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
import Loader from 'react-loader-spinner';

const DEFAULT_LOADER_WIDTH = 45;
const BIG_LOADER_WIDTH = 75;

interface LoadingProps {
  big?: boolean;
  className?: string; // Prop passed by styled-components wrapper
}

/**
 * Loading component in a centralised container.
 */
const Loading: React.FC<LoadingProps> = ({big, className}) => {
  const width = big ? BIG_LOADER_WIDTH : DEFAULT_LOADER_WIDTH;
  const height = width / 2;

  return (
    <CentralisedContainer className={className}>
      <Loader
        aria-label="Loader"
        type="ThreeDots"
        color="var(--green)"
        width={width}
        height={height}
      />
    </CentralisedContainer>
  );
};

export default Loading;
