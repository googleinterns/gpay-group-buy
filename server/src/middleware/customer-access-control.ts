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

import {Request, Response, NextFunction} from 'express';

import {
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
} from '../utils/http-errors';

/**
 * Authorizes a customer.
 * Requires req.authorizedCustomerGpayId to be set in order for this
 * access control middleware to work.
 * @params getGpayIdOfAuthorizedCustomer Getter function to get gpayId of
 * an authorized customer
 */
const customerAccessControl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedIdTokenOfCurrCustomer = req.decodedCustomer;
    if (
      decodedIdTokenOfCurrCustomer === undefined ||
      decodedIdTokenOfCurrCustomer === null
    ) {
      throw new UnauthorizedError('Invalid Authorization token format.');
    }

    const {sub: gpayIdOfCurrCustomer} = decodedIdTokenOfCurrCustomer;
    if (gpayIdOfCurrCustomer === undefined) {
      throw new UnauthorizedError('User cannot be identified.');
    }

    const gpayIdOfAuthorizedCustomer = req.authorizedCustomerGPayId;
    if (gpayIdOfAuthorizedCustomer === undefined) {
      throw new InternalServerError('req.authorizedCustomerGPayId is not set.');
    }

    if (gpayIdOfCurrCustomer !== gpayIdOfAuthorizedCustomer) {
      throw new ForbiddenError(
        'Not allowed to modify or access requested resource.'
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default customerAccessControl;
