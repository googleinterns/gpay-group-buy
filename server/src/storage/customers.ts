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

import {CUSTOMER_KIND, COMMIT_KIND} from '../constants/kinds';
import {CustomerResponse, CommitResponse} from '../interfaces';
import {get, getAll} from './datastore';

const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
  const customer = await get(CUSTOMER_KIND, customerId);
  const commits: CommitResponse[] = await getAll(COMMIT_KIND, [
    {
      property: 'customerId',
      value: customerId,
    },
    {
      property: 'commitStatus',
      value: 'ongoing',
    },
  ]);

  return {
    ...customer,
    numOngoingCommits: commits.length,
  };
};

export default {getCustomer};
