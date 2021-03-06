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

import CustomerProvider from 'components/customer/contexts/CustomerContext';
import {useRouteMatch, Switch, Route} from 'react-router-dom';

const ExplorePage = lazy(() => import('components/customer/explore'));
const ListingDetailsPage = lazy(() =>
  import('components/customer/listing-details')
);
const MyCommitsPage = lazy(() => import('components/customer/my-commits'));
const MerchantProfilePage = lazy(() =>
  import('components/customer/merchant-profile')
);

const CustomerRoutes: React.FC = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <CustomerProvider>
        <Route exact path={path} component={ExplorePage} />
        <Route
          exact
          path={`${path}listing/:listingId`}
          component={ListingDetailsPage}
        />
        <Route exact path={`${path}commits`} component={MyCommitsPage} />
        <Route
          exact
          path={`${path}merchant-profile/:merchantId`}
          component={MerchantProfilePage}
        />
      </CustomerProvider>
    </Switch>
  );
};

export default CustomerRoutes;
