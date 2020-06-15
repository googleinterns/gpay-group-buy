import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from './components/common/Loading';

// Customer Pages
const CustomerExplorePage = lazy(() => import('./components/customer/explore'));
// Merchant Pages
const MerchantLandingPage = lazy(() => import('./components/merchant/landing'));

const Routes: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={CustomerExplorePage} />
      <Route exact path="/merchant" component={MerchantLandingPage} />
    </Switch>
  </Suspense>
);

export default Routes;
