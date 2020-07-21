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

import {Commit, GroupedCommits} from 'interfaces';
import {groupByCommitStatus} from 'utils/commit-status';

describe('groupByCommitStatus', () => {
  const ongoingCommits: Commit[] = [
    {
      id: 1,
      createdAt: new Date(),
      listingId: 1,
      customerId: 1,
      commitStatus: 'ongoing',
    },
    {
      id: 2,
      createdAt: new Date(),
      listingId: 1,
      customerId: 1,
      commitStatus: 'ongoing',
    },
  ];

  const successfulCommits: Commit[] = [
    {
      id: 3,
      createdAt: new Date(),
      listingId: 1,
      customerId: 1,
      commitStatus: 'successful',
    },
  ];

  const paidCommits: Commit[] = [
    {
      id: 1,
      createdAt: new Date(),
      listingId: 1,
      customerId: 1,
      commitStatus: 'paid',
    },
  ];

  test('it should group by commit status', () => {
    const commits = [...ongoingCommits, ...successfulCommits, ...paidCommits];

    const expectedValue: GroupedCommits = {
      ongoing: ongoingCommits,
      successful: successfulCommits,
      paid: paidCommits,
    };

    expect(groupByCommitStatus(commits)).toEqual(expectedValue);
  });
});
