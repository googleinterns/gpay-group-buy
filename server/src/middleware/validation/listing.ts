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

import {BadRequestError} from '../../utils/http-errors';

const validateAndFormatDeadline = (dateString: string) => {
  const timestamp = Date.parse(dateString);
  if (Number.isNaN(timestamp)) {
    throw new BadRequestError('Listing deadline is not a valid date.');
  }
  return new Date(timestamp);
};

const validateAndFormatListing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = req.body;
    listing.deadline = validateAndFormatDeadline(req.body.deadline);
    req.validated.body = listing;
    next();
  } catch (err) {
    next(err);
  }
};

export default validateAndFormatListing;
