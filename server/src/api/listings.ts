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
 * @fileoverview Handles routing of /listings endpoints.
 * @author Karen Frilya Celine
 */

import {Router, Request, Response, NextFunction} from 'express';

import {listingService} from '../services';

const listingRouter = Router();

listingRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listings = await listingService.getAllListings();
      res.send(listings);
    } catch (error) {
      return next(error);
    }
  }
);

listingRouter.get(
  '/:listingId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { listingId: listingIdStr } = req.params;
    const listingId = Number(listingIdStr);

    try {
      const listings = await listingService.getListing(listingId);
      res.send(listings);
    } catch (error) {
      return next(error);
    }
  }
);

export default listingRouter;
