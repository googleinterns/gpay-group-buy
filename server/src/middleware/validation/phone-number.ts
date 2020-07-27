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
import {PhoneNumberUtil, PhoneNumberFormat} from 'google-libphonenumber';

import {REGION_CODE_IN} from '../../constants/common';

const e164Format = PhoneNumberFormat.E164;
const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * Validates and format a phone number.
 */
const validateAndFormatPhoneNumber = (phoneNumberField: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawPhoneNumber = req.body[phoneNumberField];
      const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(
        rawPhoneNumber,
        REGION_CODE_IN
      );

      if (!phoneUtil.isValidNumberForRegion(parsedPhoneNumber, REGION_CODE_IN)) {
        throw new Error('Invalid phone number.');
      }

      const formattedPhoneNumber = phoneUtil.format(parsedPhoneNumber, e164Format);
      req.body[phoneNumberField] = formattedPhoneNumber;
      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
};

export default validateAndFormatPhoneNumber;
