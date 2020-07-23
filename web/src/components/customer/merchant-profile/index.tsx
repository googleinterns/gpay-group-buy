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

import React, {useState, useEffect} from 'react';

import {getAllListings, getMerchantWithId} from 'api';
import BackButton from 'components/common/BackButton';
import CommitsBadge from 'components/common/CommitsBadge';
import ListingCollection from 'components/common/ListingCollection';
import {Listing, MerchantResponse} from 'interfaces';
import Container from 'muicss/lib/react/container';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as Shop} from 'assets/merchant/shop.svg';

const PageContainer = styled.div`
  margin-bottom: 1em;
`;

const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const MerchantDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  margin: 1em;

  h1 {
    font-weight: 600;
    font-size: 2em;

    margin: 10px 0;
  }
`;

const CommitsBadgeContainer = styled.div`
  align-self: flex-end;
`;

const MerchantIcon = styled(Shop)`
  max-height: 90px;
  max-width: 90px;
`;

interface MerchantProfileParams {
  merchantId: string;
}

interface ListingLocation {
  hasBack: boolean;
}

const MerchantProfilePage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ListingLocation>();
  const {merchantId: merchantIdStr} = useParams<MerchantProfileParams>();

  const merchantId = Number(merchantIdStr);

  const [merchant, setMerchant] = useState<MerchantResponse>();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchMerchant = async () => {
      const merchant = await getMerchantWithId(merchantId);
      setMerchant(merchant);
    };

    const fetchListings = async () => {
      const listings = await getAllListings({
        merchantId: merchantId,
      });
      setListings(listings);
    };

    fetchMerchant();
    fetchListings();
  }, [merchantId]);

  const handleBack = () =>
    location.state?.hasBack ? history.goBack() : history.push('/');

  // TODO: Replace merchant details with actual merchant image icon and description

  return (
    <PageContainer>
      <BackButton pos="relative" onClick={handleBack} />
      <CommitsBadgeContainer>
        <CommitsBadge pos="absolute" />
      </CommitsBadgeContainer>
      <ContentContainer>
        {merchant && (
          <MerchantDetails>
            <MerchantIcon />
            <h1>{merchant.name}</h1>
            <p>
              Risus quis varius quam quisque id diam vel quam elementum pulvinar
              etiam non quam lacus est pellentesque elit.
            </p>
          </MerchantDetails>
        )}
        <ListingCollection listings={listings} />
      </ContentContainer>
    </PageContainer>
  );
};

export default MerchantProfilePage;
