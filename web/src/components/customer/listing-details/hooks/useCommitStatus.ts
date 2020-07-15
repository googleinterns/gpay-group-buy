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

import {useState, useEffect} from 'react';

import {getCommits, addCommit, deleteCommit} from 'api';
import {CommitStatus} from 'interfaces';

/**
 * useCommitStatus hook in charge of all logic related to the
 * commit status of a listing with the specified listingId.
 */
const useCommitStatus = (listingId: number) => {
  const [commitStatus, setCommitStatus] = useState<CommitStatus>();
  const [commitId, setCommitId] = useState<number | undefined>();

  // TODO: Use actual gpay customer & token
  const sampleCustomerId = 5634161670881280;
  const token = 'replace-with-a-valid-token';

  useEffect(() => {
    const fetchCommit = async () => {
      const [commit] = await getCommits({
        listingId,
        customerId: sampleCustomerId,
      });
      if (commit !== undefined) {
        setCommitId(commit.id);
        setCommitStatus(commit.commitStatus);
      }
    };
    fetchCommit();
  }, [listingId]);

  const onCommit = async () => {
    const commit = await addCommit(
      {
        listingId,
        customerId: sampleCustomerId,
      },
      token
    );
    // TODO: Handle addition error
    setCommitId(commit.id);
    setCommitStatus(commit.commitStatus);
  };

  const onUncommit = async () => {
    if (commitId === undefined) {
      return;
    }

    await deleteCommit(commitId, token);
    // TODO: Handle deletion error
    setCommitId(undefined);
    setCommitStatus(undefined);
  };

  return {
    commitStatus,
    onCommit,
    onUncommit,
  };
};

export default useCommitStatus;
