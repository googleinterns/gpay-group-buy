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
 * @fileoverview Handles routing of /merchants endpoints.
 */

import {Router, Request, Response, NextFunction} from 'express';

import {merchantService} from '../services';

const router: Router = Router();

router.get(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const merchants = await merchantService.getAllMerchants();
      res.send(merchants);
    } catch (error) {
      return next(error);
    }
  }
);

export const merchantRouter: Router = router;
