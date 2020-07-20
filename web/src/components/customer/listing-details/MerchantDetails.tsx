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
import Container from 'muicss/lib/react/container';
import { MerchantResponse } from 'interfaces';
import { getMerchantWithId } from 'api';
import { ReactComponent as Shop } from 'assets/merchant/shop.svg';
import { Link } from 'react-router-dom';

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

const ContentContainer = styled.div`
  & > * {
    padding: 6px 0;
  }
`;

const MerchantName = styled.div`
  font-size: 1rem;
  color: var(--dark-gray);
`;

const LinkButton = styled(Link)`
  color: var(--green);
  font-weight: bold;
  text-transform: capitalize;
`;

interface MerchantDetailsProps {
  merchantId: number;
}

/**
 * MerchantDetails that contains basic merchant details,
 * as well as a link to the merchant profile page.
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
          <ContentContainer>
            <MerchantName>{merchant.name}</MerchantName>
            <LinkButton to="/">View Merchant Profile</LinkButton>
          </ContentContainer>
        </MerchantDetailsContainer>
      }
    </>
  );
};

export default MerchantDetails;
