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

import {Router, Request, Response, NextFunction} from 'express';
import {CustomerPayload} from 'interfaces';

import {customerService} from '../services';
import { readSync } from 'fs';

const customerRouter = Router();

customerRouter.get(
  '/:customerId',
  async (req: Request, res: Response, next: NextFunction) => {
    const {customerId: customerIdStr} = req.params;
    const customerId = Number(customerIdStr);

    try {
      const customer = await customerService.getCustomer(customerId);
      res.send(customer);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Create a customer if they do not already exist.
 */
customerRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const customerData: CustomerPayload = req.body;

    try {
      const customer = await customerService.addCustomer(customerData);
      const resourceUrl = `${process.env.SERVER_URL}/customers/${customer.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.location(resourceUrl);
      res.status(201).send(customer);
      // TODO: Add error handling with the appropriate response codes.
    } catch (error) {
      return next(error);
    }
  }
);

export default customerRouter;
