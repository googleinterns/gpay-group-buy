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

import {CommitRequest, CommitPaymentRequest} from '../interfaces';
import customerAccessControl from '../middleware/customer-access-control';
import customerAuth from '../middleware/customer-auth';
import validateAndFormatPhoneNumber from '../middleware/validation/phone-number';
import {commitService, customerService} from '../services';
import {BadRequestError} from '../utils/http-errors';

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
        throw new BadRequestError('Query params not specified.');
      }
      // TODO: Parse queryParams json to make it CommitPayload type in runtime, which
      // throws the appropriate type errors.
      // Right now services is handling the type casting and throwing of errors.
      const commits = await commitService.getAllCommits(queryParams);
      res.status(200).json(commits);
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
    const {customerId: customerIdStr, listingId: listingIdStr} = req.body;
    const customerId = Number(customerIdStr);
    const listingId = Number(listingIdStr);

    if (Number.isNaN(customerId) || Number.isNaN(listingId)) {
      return next(new BadRequestError('Invalid request body'));
    }
    req.validated = {
      ...req,
      body: {customerId, listingId},
    };
    next();
  },
  customerAccessControl(async (req: Request) => {
    const customerId = Number(req.validated.body.customerId);
    const customer = await customerService.getCustomer(customerId);
    return customer.gpayId;
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const commitData = req.validated.body as CommitRequest;

    try {
      const addedCommit = await commitService.addCommit(commitData);
      const resourceUrl = `${process.env.SERVER_URL}/commits/${addedCommit.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.location(resourceUrl);
      res.status(201).send(addedCommit);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Handles the post requests to pay for commits.
 */
commitRouter.post(
  '/:commitId/pay',
  customerAuth,
  validateAndFormatPhoneNumber(
    (body: CommitPaymentRequest) => body.fulfilmentDetails.contactNumber,
    (body: CommitPaymentRequest, phoneNumber: string) =>
      (body.fulfilmentDetails.contactNumber = phoneNumber)
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId: commitIdStr} = req.params;
    const commitId = Number(commitIdStr);

    if (Number.isNaN(commitId)) {
      return next(new BadRequestError(`Invalid commitId ${commitIdStr}`));
    }

    // TODO: Parse req.body json to make it CommitPaymentRequest type in runtime.
    req.validated = {
      ...req,
      params: {commitId},
    };
    next();
  },
  customerAccessControl(async (req: Request) => {
    const commit = await commitService.getCommit(req.validated.params.commitId);
    const customer = await customerService.getCustomer(commit.customerId);
    return customer.gpayId;
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId} = req.validated.params;
    const paymentRequest: CommitPaymentRequest = req.validated.body;

    try {
      const commit = await commitService.payForCommit(commitId, paymentRequest);
      res.status(200).json(commit);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Handles post requests to complete the commit with the specified commitId.
 */
commitRouter.post(
  '/:commitId/complete',
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId: commitIdStr} = req.params;
    const commitId = Number(commitIdStr);

    try {
      if (Number.isNaN(commitId)) {
        throw new BadRequestError(`Invalid commitId ${commitIdStr}`);
      }

      const commit = await commitService.completeCommit(commitId);

      const resourceUrl = `${process.env.SERVER_URL}/commits/${commit.id}`;
      res.setHeader('Content-Location', resourceUrl);
      res.status(200).json(commit);
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
  customerAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId: commitIdStr} = req.params;
    const commitId = Number(commitIdStr);

    if (Number.isNaN(commitId)) {
      return next(new BadRequestError(`Invalid commitId ${commitIdStr}`));
    }
    req.validated = {
      ...req,
      params: {commitId},
    };
    next();
  },
  customerAccessControl(async (req: Request) => {
    const commit = await commitService.getCommit(req.validated.params.commitId);
    const customer = await customerService.getCustomer(commit.customerId);
    return customer.gpayId;
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const {commitId} = req.validated.params;

    try {
      await commitService.deleteCommit(commitId);
      res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
);

export default commitRouter;
