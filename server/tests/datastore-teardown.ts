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

import fetch from 'node-fetch';

/**
 * Teardown Datastore emulator by resetting the datastore emulator.
 */
const teardownDatastoreEmulator = async () => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('This function can only be run during tests.');
    return;
  }

  console.log('\nTearing down Datastore Emulator...');
  console.log(process.env.DATASTORE_EMULATOR_PORT);
  // Make a post request to <emulator_host>:<emulator_port> to reset emulator data
  await fetch(`http://localhost:${process.env.DATASTORE_EMULATOR_PORT}/reset`, {
    method: 'post',
  });
};

export default teardownDatastoreEmulator;
