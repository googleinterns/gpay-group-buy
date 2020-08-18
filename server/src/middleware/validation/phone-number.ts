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
import {PhoneNumberUtil} from 'google-libphonenumber';

import {REGION_CODE_IN} from '../../constants/common';
import {BadRequestError} from '../../utils/http-errors';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PhoneNumberGetter = (body: any) => string | undefined;
type PhoneNumberSetter = (body: any, phoneNumber: string) => void;
/* eslint-enable @typescript-eslint/no-explicit-any */

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * Middleware that validates and format a phone number.
 * The resultant phone number format is E.123 international notation.
 * Note that the national phone number portion will only contain digits (no spaces).
 * Eg: +91 1234567890
 * @params getPhoneNumber Getter function for getting the phone number from req body
 * @params setPhoneNumber Setter function for setting the phone number to req body
 * @params requireIndiaRegion Indicates if we should check if the phone number is
 * local to India region.
 */
const validateAndFormatPhoneNumber = (
  getPhoneNumber: PhoneNumberGetter,
  setPhoneNumber: PhoneNumberSetter,
  requireIndiaRegion = true
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawPhoneNumber = getPhoneNumber(req.body);
      if (rawPhoneNumber === undefined) {
        next();
        return;
      }

      const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(
        rawPhoneNumber,
        REGION_CODE_IN
      );

      const isValidNumber = requireIndiaRegion
        ? phoneUtil.isValidNumberForRegion(parsedPhoneNumber, REGION_CODE_IN)
        : phoneUtil.isValidNumber(parsedPhoneNumber);

      if (!isValidNumber) {
        throw new BadRequestError('Invalid phone number.');
      }

      const countryCode = parsedPhoneNumber.getCountryCodeOrDefault();
      const nationalNUmber = parsedPhoneNumber.getNationalNumberOrDefault();
      const formattedPhoneNumber = `+${countryCode} ${nationalNUmber}`;
      setPhoneNumber(req.body, formattedPhoneNumber);
      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
};

export default validateAndFormatPhoneNumber;
