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
 * @fileoverview Handles routing of /customers endpoints.
 */

import express from 'express';

import {customerService} from '../services';

const customerRouter = express.Router();

customerRouter.get(
  '/:customerId',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {customerId} = req.params;

    try {
      const customer = await customerService.getCustomer(customerId);
      res.send(customer);
    } catch (error) {
      return next(error);
    }
  }
);

export default customerRouter;
