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

import {CustomerPayload} from '../interfaces';
import customerAccessControl from '../middleware/customer-access-control';
import customerAuth from '../middleware/customer-auth';
import validateAndFormatPhoneNumber from '../middleware/validation/phone-number';
import {customerService} from '../services';
import {BadRequestError} from '../utils/http-errors';

const customerRouter = Router();

customerRouter.get(
  '/:customerId',
  async (req: Request, res: Response, next: NextFunction) => {
    const {customerId: customerIdStr} = req.params;
    const customerId = Number(customerIdStr);

    try {
      if (Number.isNaN(customerId)) {
        throw new BadRequestError(`Invalid customerId ${customerIdStr}`);
      }

      const customer = await customerService.getCustomer(customerId);
      res.send(customer);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Endpoint for the "logging in" of customers.
 * If the customer does not exists, add the customer and return the
 * added customer details in the response body with code 201.
 * Else if the customer exists, we check if the provided gpayContactNumber
 * matches the gpayContactNumber of the existing customer, and update it
 * if it does not match. The endpoint then returns the customer details in
 * the response body with code 200.
 */
customerRouter.post(
  '/',
  customerAuth,
  validateAndFormatPhoneNumber(
    (body: Partial<CustomerPayload>) => body.gpayContactNumber,
    (body: Partial<CustomerPayload>, phoneNumber: string) =>
      (body.gpayContactNumber = phoneNumber),
    false
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Ensure that req.body is of type CustomerPayload
    req.validated = req;
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    req.authorizedCustomerGPayId = req.validated.body.gpayId;
    next();
  },
  customerAccessControl,
  async (req: Request, res: Response, next: NextFunction) => {
    const customerData: CustomerPayload = req.validated.body;

    try {
      // Customers are unique by their gpayId, so we will retrieve
      // the customer using their gpay Id.
      let existingCustomer = await customerService.getCustomerWithGpayId(
        customerData.gpayId
      );
      if (existingCustomer !== null) {
        // Update gpayContactNumber if it does not match
        const {gpayContactNumber} = customerData;
        if (
          gpayContactNumber &&
          existingCustomer.gpayContactNumber !== gpayContactNumber
        ) {
          existingCustomer = await customerService.updateCustomer(
            existingCustomer.id,
            {
              gpayContactNumber,
            }
          );
        }

        const resourceUrl = `${process.env.SERVER_URL}/customers/${existingCustomer.id}`;
        res.setHeader('Content-Location', resourceUrl);
        res.status(200).send(existingCustomer);
        return;
      }

      const addedCustomer = await customerService.addCustomer(customerData);
      const resourceUrl = `${process.env.SERVER_URL}/customers/${addedCustomer.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.location(resourceUrl);
      res.status(201).send(addedCustomer);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Handles the PATCH requests to modify an existing customer with the specified customerId.
 * If successful, returns the modified customer in the response body with code 200.
 */
customerRouter.patch(
  '/:customerId',
  customerAuth,
  validateAndFormatPhoneNumber(
    (body: Partial<CustomerPayload>) =>
      body.defaultFulfilmentDetails?.contactNumber,
    (body: Partial<CustomerPayload>, phoneNumber: string) =>
      body.defaultFulfilmentDetails &&
      (body.defaultFulfilmentDetails.contactNumber = phoneNumber)
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const {customerId: customerIdStr} = req.params;
    const customerId = Number(customerIdStr);

    if (Number.isNaN(customerId)) {
      return next(new BadRequestError(`Invalid customerId ${customerIdStr}`));
    }
    req.validated = {
      ...req,
      params: {customerId},
    };
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await customerService.getCustomer(
        req.validated.params.customerId
      );
      req.authorizedCustomerGPayId = customer.gpayId;
      next();
    } catch (err) {
      next(err);
    }
  },
  customerAccessControl,
  async (req: Request, res: Response, next: NextFunction) => {
    const {customerId} = req.validated.params;
    const fieldsToUpdate = req.validated.body;

    try {
      const modifiedCustomer = await customerService.updateCustomer(
        customerId,
        fieldsToUpdate
      );
      res.status(200).send(modifiedCustomer);
    } catch (error) {
      return next(error);
    }
  }
);

export default customerRouter;
