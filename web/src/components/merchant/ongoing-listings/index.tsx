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

import React, {useEffect, useState} from 'react';

import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import {MerchantResponse} from 'interfaces';

const OngoingListingsPage: React.FC = () => {
  const [merchant, setMerchant] = useState<MerchantResponse | undefined>(
    undefined
  );
  const {getMerchant} = useMerchantContext();

  useEffect(() => {
    const populateMerchantData = async () => {
      const merchant = await getMerchant();
      setMerchant(merchant);
    };

    populateMerchantData();
  }, [getMerchant]);

  return <div>{merchant?.name}</div>;
};

export default OngoingListingsPage;
