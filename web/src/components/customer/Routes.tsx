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

import CustomerCommitCountProvider from 'components/customer/contexts/CommitCountContext';
import {useRouteMatch, Switch, Route} from 'react-router-dom';

// Customer Pages
const CustomerExplorePage = lazy(() => import('components/customer/explore'));
// Common Pages
const ListingDetailsPage = lazy(() => import('components/listing-details'));

const CustomerRoutes: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <CustomerCommitCountProvider>
        <Route exact path={match.path} component={CustomerExplorePage} />
        <Route path={`${match.path}listing/:listingId`} component={ListingDetailsPage} />
      </CustomerCommitCountProvider>
    </Switch>
  );
};

export default CustomerRoutes;
