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

import {Datastore} from '@google-cloud/datastore';
import portfinder from 'portfinder';

import {
  CUSTOMER_KIND,
  COMMIT_KIND,
  LISTING_KIND,
  MERCHANT_KIND,
} from '../src/constants/kinds';
import commitFixtures from './fixtures/commits';
import customerFixtures from './fixtures/customers';
import listingFixtures from './fixtures/listings';
import merchantFixtures from './fixtures/merchants';

const datastore = new Datastore();

/**
 * Checks if we are running the datastore emulator.
 * We do so by checking if the emulator port is in use.
 */
const isDatastoreEmulator = async (port: number) => {
  const res = await portfinder.getPortPromise({port});
  return res !== port;
};

/**
 * Intializes Datastore emulator by populating the datastore with fixtures.
 * Prevents the adding of test entities if datastore emulator is not running.
 */
const initDatastoreEmulator = async () => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Datastore Emulator can only be initialized for tests.');
    return;
  }
  if (process.env.DATASTORE_EMULATOR_HOST === undefined) {
    console.error(
      'Make sure you have initialized the Datastore Emulator env.\n' +
        'Run: $(gcloud beta emulators datastore env-init)'
    );
    return;
  }
  const port = process.env.DATASTORE_EMULATOR_HOST.split(':').pop();
  const isEmulatorRunning = await isDatastoreEmulator(Number(port));
  if (!isEmulatorRunning) {
    console.error(
      'Make sure you are running the Datastore Emulator.\n' +
        'Run: gcloud beta emulators datastore start --no-store-on-disk'
    );
    return;
  }

  console.log('\nSetting up Datastore Emulator...');
  const customerEntities = customerFixtures.data.map((data, idx) => {
    const id = customerFixtures.ids[idx];
    const key = datastore.key([CUSTOMER_KIND, id]);
    return {key, data};
  });
  const listingEntities = listingFixtures.data.map((data, idx) => {
    const id = listingFixtures.ids[idx];
    const key = datastore.key([LISTING_KIND, id]);
    return {key, data};
  });
  const commitEntities = commitFixtures.data.map((data, idx) => {
    const id = commitFixtures.ids[idx];
    const key = datastore.key([COMMIT_KIND, id]);
    return {key, data};
  });
  const merchantEntities = merchantFixtures.data.map((data, idx) => {
    const id = merchantFixtures.ids[idx];
    const key = datastore.key([MERCHANT_KIND, id]);
    return {key, data};
  });

  await datastore.upsert([
    ...customerEntities,
    ...listingEntities,
    ...commitEntities,
    ...merchantEntities,
  ]);
};

export default initDatastoreEmulator;
