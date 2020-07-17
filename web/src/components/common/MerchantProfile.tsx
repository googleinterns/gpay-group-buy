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

import CentralisedContainer from 'components/common/CentralisedContainer';
import MerchantDetailRow from 'components/common/MerchantDetailRow';
import {useMerchantContext} from 'components/merchant/contexts/MerchantContext';
import {MerchantResponse} from 'interfaces';
import {CreditCard, Mail} from 'react-feather';
import styled from 'styled-components';

import {ReactComponent as Shop} from 'assets/merchant/shop.svg';

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

/**
 * This is the profile of the signed-up merchant, shown on the side bar of merchant pages.
 */
const MerchantProfile: React.FC = () => {
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

  return (
    <CentralisedContainer>
      <Shop />
      {merchant && (
        <>
          <Header>{merchant.name}</Header>
          <DetailsContainer>
            <MerchantDetailRow icon={Mail} text={merchant.email} />
            <MerchantDetailRow icon={CreditCard} text={merchant.vpa} />
          </DetailsContainer>
        </>
      )}
    </CentralisedContainer>
  );
};

export default MerchantProfile;
