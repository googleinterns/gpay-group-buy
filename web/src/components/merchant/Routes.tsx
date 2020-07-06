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

import React, {lazy} from 'react';

import {useRouteMatch, Switch, Route} from 'react-router-dom';

const MerchantLandingPage = lazy(() => import('components/merchant/landing'));
const MerchantSignUpPage = lazy(() => import('components/merchant/sign-up'));
const MerchantSignInPage = lazy(() => import('components/merchant/sign-in'));

const MerchantRoutes: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.path} component={MerchantLandingPage} />
      <Route exact path={`${match.path}sign-up`} component={MerchantSignUpPage} />
      <Route exact path={`${match.path}sign-in`} component={MerchantSignInPage} />
    </Switch>
  );
};

export default MerchantRoutes;
