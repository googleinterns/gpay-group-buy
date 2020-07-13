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

/**
 * @fileoverview Handles routing of /commits endpoints.
 */

import express, {Request, Response, NextFunction} from 'express';

import {CommitRequest} from '../interfaces';
import customerAuth from '../middleware/customer-auth';
import {commitService} from '../services';

const commitRouter = express.Router();

/**
 * Handles the get request for retrieving all commits.
 */
commitRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query;
      if (Object.keys(queryParams).length === 0) {
        res.sendStatus(400);
        return;
      }
      // TODO: Parse queryParams json to make it CommitPayload type in runtime, which
      // throws the appropriate type errors.
      // Right now services is handling the type casting and throwing of errors.
      const commits = await commitService.getAllCommits(queryParams);
      res.status(200).json(commits);
      // TODO: Add error handling with the appropriate response codes.
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Handles the post requests to create new commits.
 */
commitRouter.post(
  '/',
  customerAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Parse req.body json to make it CommitRequest type in runtime.
    // Right now I am forcing it to be of the correct types.
    const commitData: CommitRequest = {
      customerId: Number(req.body.customerId),
      listingId: Number(req.body.listingId),
    };

    try {
      const addedCommit = await commitService.addCommit(commitData);
      const resourceUrl = `${process.env.SERVER_URL}/commits/${addedCommit.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.location(resourceUrl);
      res.status(201).send(addedCommit);
      // TODO: Add error handling with the appropriate response codes.
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Handles the delete requests to delete a commit with the specified commitId.
 */
commitRouter.delete(
  '/:commitId',
  // customerAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId: commitIdStr} = req.params;
    const commitId = Number(commitIdStr);

    try {
      await commitService.deleteCommit(commitId);
      res.sendStatus(204);
      // TODO: Add error handling with the appropriate response codes.
    } catch (error) {
      return next(error);
    }
  }
);

export default commitRouter;
