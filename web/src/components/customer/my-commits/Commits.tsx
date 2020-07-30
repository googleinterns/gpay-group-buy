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
import {Commit, GroupedCommits, Listing} from 'interfaces';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import ListingCardWithCommitStatus from './ListingCardWithCommitStatus';

const CommitsContainer = styled.div`
  display: flex;
  flex-flow: column wrap;

  word-break: break-word;

  & > h2 {
    font-size: 1.4em;
  }
`;
interface CommitSectionProps {
  commits: Commit[];
}

const CommitSection: React.FC<CommitSectionProps> = ({commits}) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingIds = commits.map(commit => commit.listingId);
      const listings = await getAllListings({ids: listingIds.join(',')});
      setListings(listings);
    };

    fetchListings();
  }, [commits]);

  return (
    <>
      {listings.map((listing, idx) => (
        <Link
          to={{
            pathname: `listing/${listing.id}`,
            state: {
              fromExplore: true,
            },
          }}
          key={idx}
        >
          <ListingCardWithCommitStatus
            listing={listing}
            commitStatus={commits[idx].commitStatus}
          />
        </Link>
      ))}
    </>
  );
};

interface CommitsProps {
  commits: GroupedCommits;
}

/**
 * Contains the content of the My Commits page.
 */
const Commits: React.FC<CommitsProps> = ({
  commits: {ongoing, successful, paid, completed, unsuccessful},
}) => (
  <CommitsContainer>
    <h2>Awaiting Payment</h2>
    {successful && <CommitSection commits={successful} />}
    <h2>Ongoing</h2>
    {ongoing && <CommitSection commits={ongoing} />}
    <h2>History</h2>
    {paid && <CommitSection commits={paid} />}
    {completed && <CommitSection commits={completed} />}
    {unsuccessful && <CommitSection commits={unsuccessful} />}
  </CommitsContainer>
);

export default Commits;
