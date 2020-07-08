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

import {commitService} from '../services';

const commitRouter = express.Router();

/**
 * Handles the get request for retrieving all commits.
 */
commitRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commits = await commitService.getAllCommits(req.query);
      res.status(200).json(commits);
      // TODO: Add error handling with the appropriate response codes.
    } catch (error) {
      return next(error);
    }
  }
);

export default commitRouter;
