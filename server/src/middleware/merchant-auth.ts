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
import admin from 'firebase-admin';

import {merchantService} from '../services';

admin.initializeApp();

const getVerifiedUid = async (firebaseIdToken: string): Promise<string> => {
  const decodedFirebaseIdToken = await admin
    .auth()
    .verifyIdToken(firebaseIdToken);
  return decodedFirebaseIdToken.uid;
};

const merchantAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Missing Authorization header.');
    }

    const [_, firebaseIdToken] = req.headers.authorization.split(' ');
    const verifiedFirebaseUid = await getVerifiedUid(firebaseIdToken);

    let firebaseUid;
    if (req.body.firebaseUid !== undefined) {
      firebaseUid = req.body.firebaseUid;
    } else if (req.body.merchantId !== undefined) {
      const merchant = await merchantService.getMerchant(req.body.merchantId);
      firebaseUid = merchant.firebaseUid;
    }

    if (firebaseUid !== undefined && firebaseUid !== verifiedFirebaseUid) {
      throw new Error('Invalid bearer token.');
    }

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

export default merchantAuth;
