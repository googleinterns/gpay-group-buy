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

import CentralisedPage from 'components/common/CentralisedPage';
import Loading from 'components/common/Loading';
import styled from 'styled-components';

import {ReactComponent as BrandSvg} from 'assets/gpay-groupbuy-brand.svg';

const Brand = styled(BrandSvg)`
  max-width: 200px;
`;

/**
 * Full loading page with a Group buy brand on top of the Loading spinner.
 */
const LoadingPage: React.FC = () => (
  <CentralisedPage>
    <Brand aria-label="GPay GroupBuy Brand" />
    <Loading big />
  </CentralisedPage>
);

export default LoadingPage;
