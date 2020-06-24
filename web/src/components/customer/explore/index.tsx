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

import {getAllListings} from 'api';
import {Listing} from 'interfaces';
import Container from 'muicss/lib/react/container';

import ListingsCollection from './ListingsCollection';

const CustomerExplorePage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getAllListings();
      setListings(listings);
    };
    fetchListings();
  }, []);

  return (
    <Container>
      <h1>Explore</h1>
      <ListingsCollection listings={listings} />
    </Container>
  );
};

export default CustomerExplorePage;
