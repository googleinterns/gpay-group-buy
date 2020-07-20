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

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import { MerchantResponse } from 'interfaces';
import { getMerchantWithId } from 'api';
import { ReactComponent as Shop } from 'assets/merchant/shop.svg';

const MerchantDetailsContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.5rem 0;

  & > * {
    padding: 0.5rem;
  }
`;

const MerchantIcon = styled(Shop)`
  max-height: 55px;
  max-width: 55px;
`;

const MerchantName = styled.span`
  font-size: 1rem;
  color: var(--dark-gray);
`;

const LinkButton = styled(Button)`
  display: flex;
  align-items: center;

  padding-left: 0;

  font-weight: bold;

  && {
    color: var(--green);
    text-transform: capitalize;
  }
`;

interface MerchantDetailsProps {
  merchantId: number;
}

/**
 * ListingDetailsSection that contains full listing details.
 */
const MerchantDetails: React.FC<MerchantDetailsProps> = ({
  merchantId,
}) => {
  const [merchant, setMerchant] = useState<MerchantResponse>();

  useEffect(() => {
    const fetchMerchant = async () => {
      const merchant = await getMerchantWithId(merchantId);
      setMerchant(merchant);
    };
    fetchMerchant();
  }, [merchantId]);

  return (
    <>
      {merchant &&
        <MerchantDetailsContainer>
          <MerchantIcon />
          <div>
            <MerchantName>{merchant.name}</MerchantName>
            <LinkButton variant="flat">View Merchant Profile</LinkButton>
          </div>
        </MerchantDetailsContainer>
      }
    </>
  );
};

export default MerchantDetails;
