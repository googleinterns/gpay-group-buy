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

import {MerchantPayload} from '../interfaces';
import merchantAuth from '../middleware/merchant-auth';
import {merchantService} from '../services';
import {BadRequestError} from '../utils/http-errors';

const merchantRouter: Router = Router();

merchantRouter.get(
  '/:merchantId',
  async (req: Request, res: Response, next: NextFunction) => {
    const {merchantId: merchantIdStr} = req.params;
    const merchantId = Number(merchantIdStr);

    try {
      if (Number.isNaN(merchantId)) {
        throw new BadRequestError(`Invalid merchantId ${merchantIdStr}`);
      }

      const merchant = await merchantService.getMerchant(merchantId);
      res.send(merchant);
    } catch (error) {
      return next(error);
    }
  }
);

merchantRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = Object.keys(req.query).map(key => ({
        property: key,
        value: req.query[key],
      }));
      const merchants = await merchantService.getAllMerchants(filters);
      res.status(200).json(merchants);
    } catch (error) {
      return next(error);
    }
  }
);

merchantRouter.post(
  '/',
  merchantAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const merchantPayload: MerchantPayload = req.body;
      const merchant = await merchantService.addMerchant(merchantPayload);
      const resourceUrl = `${process.env.SERVER_URL}/merchants/${merchant.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.location(resourceUrl);
      res.status(201);
      res.json(merchant);
    } catch (error) {
      return next(error);
    }
  }
);

export default merchantRouter;
