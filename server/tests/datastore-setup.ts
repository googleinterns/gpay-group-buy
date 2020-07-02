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

import {CUSTOMER_KIND} from '../src/constants/kinds';
import customerFixtures from './fixtures/customers';

const datastore = new Datastore();

/**
 * Checks if we are running the datastore emulator.
 * We do so by checking if the emulator port is in use.
 */
const isDatastoreEmulator = async () => {
  const port = Number(process.env.DATASTORE_EMULATOR_PORT);
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
  const isEmulatorRunning = await isDatastoreEmulator();
  if (!isEmulatorRunning) {
    console.error(
      'Make sure you are running the Datastore Emulator. Run: gcloud beta emulators datastore start --no-store-on-disk'
    );
    return;
  }

  console.log('\nSetting up Datastore Emulator...');

  const customerEntities = customerFixtures.data.map((data, idx) => {
    const id = customerFixtures.ids[idx];
    const key = datastore.key([CUSTOMER_KIND, id]);
    return {key, data};
  });

  await datastore.upsert(customerEntities);
};

export default initDatastoreEmulator;
