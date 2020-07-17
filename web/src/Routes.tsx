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

import React, {lazy, Suspense} from 'react';

import Loading from 'components/common/Loading';
import CustomerRoutes from 'components/customer/Routes';
import MerchantRoutes from 'components/merchant/Routes';
import {Switch, Route} from 'react-router-dom';

// Design samples
const DesignSamplesPage = lazy(() => import('components/design-samples'));

const Routes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/design-samples" component={DesignSamplesPage} />
      <Route path="/merchant/" component={MerchantRoutes} />
      <Route path="/" component={CustomerRoutes} />
    </Switch>
  </Suspense>
);

export default Routes;
