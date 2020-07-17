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

import MerchantProvider from 'components/merchant/contexts/MerchantContext';
import {useRouteMatch, Switch, Route} from 'react-router-dom';

const MerchantLandingPage = lazy(() => import('components/merchant/landing'));
const MerchantSignUpPage = lazy(() => import('components/merchant/sign-up'));
const MerchantSignInPage = lazy(() => import('components/merchant/sign-in'));
const MerchantListingsPage = lazy(() => import('components/merchant/listings'));

const MerchantRoutes: React.FC = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <MerchantProvider>
        <Route exact path={path} component={MerchantLandingPage} />
        <Route exact path={`${path}sign-up`} component={MerchantSignUpPage} />
        <Route exact path={`${path}sign-in`} component={MerchantSignInPage} />
        <Route exact path={`${path}home`} component={MerchantListingsPage} />
      </MerchantProvider>
    </Switch>
  );
};

export default MerchantRoutes;
