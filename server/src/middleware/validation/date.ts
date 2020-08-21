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
import moment from 'moment';

import {BadRequestError} from '../../utils/http-errors';

/* eslint-disable @typescript-eslint/no-explicit-any */
type DateGetter = (body: any) => string | undefined;
type DateSetter = (body: any, date: Date) => void;
/* eslint-ensable @typescript-eslint/no-explicit-any */

const validateAndFormatDate = (getDate: DateGetter, setDate: DateSetter) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateString = getDate(req.body);
  if (dateString === undefined) {
    throw new BadRequestError('Date is undefined.');
  }

  const dateMoment = moment(dateString);
  if (!dateMoment.isValid()) {
    throw new BadRequestError('Invalid date.');
  }

  setDate(req.body, dateMoment.toDate());
  next();
};

export default validateAndFormatDate;
