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
import CustomerCommitCountProvider from 'components/customer/contexts/CommitCountContext';
import MerchantProvider from 'components/merchant/contexts/MerchantContext';
import {Switch, Route} from 'react-router-dom';

// Customer Pages
const CustomerExplorePage = lazy(() => import('components/customer/explore'));
// Merchant Pages
const MerchantLandingPage = lazy(() => import('components/merchant/landing'));
const MerchantSignUpPage = lazy(() => import('components/merchant/sign-up'));
const MerchantSignInPage = lazy(() => import('components/merchant/sign-in'));
// Common Pages
const ListingDetailsPage = lazy(() => import('components/listing-details'));
// Design samples
const DesignSamplesPage = lazy(() => import('components/design-samples'));

const Routes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/design-samples" component={DesignSamplesPage} />
      <MerchantProvider>
        <Route exact path="/merchant" component={MerchantLandingPage} />
        <Route exact path="/merchant/sign-up" component={MerchantSignUpPage} />
        <Route exact path="/merchant/sign-in" component={MerchantSignInPage} />
      </MerchantProvider>
      <CustomerCommitCountProvider>
        <Route exact path="/" component={CustomerExplorePage} />
        <Route path="/listing/:listingId" component={ListingDetailsPage} />
      </CustomerCommitCountProvider>
    </Switch>
  </Suspense>
);

export default Routes;
