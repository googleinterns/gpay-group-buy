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

import React from 'react';

import Card from 'components/common/Card';
import CommitProgress from 'components/common/CommitProgress';
import ListingCard from 'components/common/ListingCard';
import StrippedCol from 'components/common/StrippedCol';
import ListingCardWithCommitStatus from 'components/customer/my-commits/ListingCardWithCommitStatus';
import MobilePromptSample from 'components/design-samples/MobilePromptSample';
import {formatRFC3339} from 'date-fns';
import {Money, Listing} from 'interfaces';
import Container from 'muicss/lib/react/container';

const SAMPLE_IMG_URL = 'https://picsum.photos/seed/picsum/200/300';
const SAMPLE_END_DATE = formatRFC3339(new Date('2020-07-10T23:59:59Z'));
const SAMPLE_PRICE: Money = {
  currency: 'USD',
  dollars: 85,
  cents: 0,
};
const SAMPLE_OLD_PRICE: Money = {
  currency: 'USD',
  dollars: 121,
  cents: 0,
};
const SAMPLE_LISTING: Listing = {
  merchantId: 1,
  name: 'Some Listing',
  price: SAMPLE_PRICE,
  oldPrice: SAMPLE_OLD_PRICE,
  imgUrl: SAMPLE_IMG_URL,
  description: '',
  deadline: SAMPLE_END_DATE,
  minCommits: 100,
  id: 1,
  numCommits: 0,
  numPaid: 0,
  numCompleted: 0,
  listingStatus: 'ongoing',
};

const DesignSamplesPage: React.FC = () => (
  <Container>
    <h1>Design Samples</h1>
    <Container>
      <h2>Cards</h2>
      <StrippedCol xs={6}>
        <Card
          img={{
            url: SAMPLE_IMG_URL,
            alt: 'Random Image',
          }}
        >
          Card with image on top. Risus quis varius quam quisque id diam vel
          quam elementum pulvinar etiam.
        </Card>
      </StrippedCol>
      <StrippedCol xs={6}>
        <ListingCard
          listingName="Some Listing"
          price={SAMPLE_PRICE}
          oldPrice={SAMPLE_OLD_PRICE}
          endDate={SAMPLE_END_DATE}
          imgUrl={SAMPLE_IMG_URL}
        >
          <CommitProgress numCommits={70} minCommits={100} textPos="none" />
        </ListingCard>
      </StrippedCol>
      <StrippedCol xs={12}>
        <ListingCard
          listingName="Some Listing"
          price={SAMPLE_PRICE}
          oldPrice={SAMPLE_OLD_PRICE}
          endDate={SAMPLE_END_DATE}
          imgUrl={SAMPLE_IMG_URL}
          horizontal
        >
          <CommitProgress numCommits={70} minCommits={100} />
        </ListingCard>
      </StrippedCol>
      <ListingCardWithCommitStatus
        listing={SAMPLE_LISTING}
        commitStatus="successful"
      />
      <ListingCardWithCommitStatus
        listing={SAMPLE_LISTING}
        commitStatus="paid"
      />
      <ListingCardWithCommitStatus
        listing={SAMPLE_LISTING}
        commitStatus="completed"
      />
      <ListingCardWithCommitStatus
        listing={SAMPLE_LISTING}
        commitStatus="unsuccessful"
      />
      <StrippedCol xs={12}>
        <Card
          img={{
            url: SAMPLE_IMG_URL,
            alt: 'Random Image',
          }}
          horizontal
        >
          Card with image on left. Risus quis varius quam quisque id diam vel
          quam elementum pulvinar etiam non quam lacus est pellentesque elit.
        </Card>
      </StrippedCol>
      <StrippedCol xs={12}>
        <Card>
          Card with no image. Risus quis varius quam quisque id diam vel quam
          elementum pulvinar etiam non quam lacus est pellentesque elit.
        </Card>
      </StrippedCol>
    </Container>
    <Container>
      <h2>Progress Bars</h2>
      <StrippedCol xs={12}>
        <CommitProgress numCommits={70} minCommits={100} />
      </StrippedCol>
      <StrippedCol xs={12}>
        <CommitProgress numCommits={70} minCommits={100} textPos="top" />
      </StrippedCol>
      <StrippedCol xs={12}>
        <CommitProgress
          numCommits={70}
          minCommits={100}
          textPos="none"
          thicker
        />
      </StrippedCol>
    </Container>
    <Container>
      <h2>Mobile Prompt</h2>
      <MobilePromptSample />
    </Container>
  </Container>
);

export default DesignSamplesPage;
