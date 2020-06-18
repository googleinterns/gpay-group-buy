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

import Container from 'muicss/lib/react/container';

import Card from 'components/common/Card';
import StrippedCol from 'components/common/StrippedCol';
import ListingCard from 'components/common/ListingCard';

const SAMPLE_IMG_URL = 'https://picsum.photos/seed/picsum/200/300';

const DesignSamplesPage: React.FC = () => (
  <Container>
    <h1>Design Samples</h1>
    <h2>Cards</h2>
    <StrippedCol xs={6}>
      <Card
        img={{
          url: SAMPLE_IMG_URL,
          alt: 'Random Image',
        }}
      >
        Card with image on top. Risus quis varius quam quisque id diam vel quam elementum pulvinar etiam.
      </Card>
    </StrippedCol>
    <StrippedCol xs={6}>
      <ListingCard
        listingName="Some Listing"
        price={85}
        oldPrice={121}
        endDate="2d Left"
        imgUrl={SAMPLE_IMG_URL}
      >
        Progress bar here
      </ListingCard>
    </StrippedCol>
    <StrippedCol xs={12}>
      <ListingCard
        listingName="Some Listing"
        price={85}
        oldPrice={121}
        endDate="2d Left"
        imgUrl={SAMPLE_IMG_URL}
        horizontal
      >
        Progress bar here
      </ListingCard>
    </StrippedCol>
    <StrippedCol xs={12}>
      <Card
        img={{
          url: SAMPLE_IMG_URL,
          alt: 'Random Image',
        }}
        imgLeft
      >
        Card with image on left. Risus quis varius quam quisque id diam vel quam elementum pulvinar etiam
        non quam lacus est pellentesque elit.
      </Card>
    </StrippedCol>
    <StrippedCol xs={12}>
      <Card>
        Card with no image. Risus quis varius quam quisque id diam vel quam elementum pulvinar etiam
        non quam lacus est pellentesque elit.
      </Card>
    </StrippedCol>
  </Container>
);

export default DesignSamplesPage;
