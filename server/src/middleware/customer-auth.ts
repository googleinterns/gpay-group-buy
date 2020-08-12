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
import jwt, {
  VerifyOptions,
  GetPublicKeyOrSecret,
  JwtHeader,
  SigningKeyCallback,
} from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import {UnauthorizedError, InternalServerError} from '../utils/http-errors';

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
});

/**
 * Gets public key or secret from jwt header.
 */
const getKey: GetPublicKeyOrSecret = (
  header: JwtHeader,
  keyCallback: SigningKeyCallback
) => {
  const kid = header.kid || '';
  client.getSigningKey(kid, (err, key) => {
    if (err) {
      keyCallback(err);
    } else {
      const signingKey =
        (key as jwksClient.CertSigningKey).publicKey ||
        (key as jwksClient.RsaSigningKey).rsaPublicKey;
      keyCallback(null, signingKey);
    }
  });
};

/**
 * Authenticates a customer.
 */
const customerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader?.split(' ')?.[1];
    if (idToken === undefined) {
      throw new UnauthorizedError('Missing Authorization token.');
    }

    if (process.env.OAUTH_CLIENT_ID === undefined) {
      throw new InternalServerError('Missing OAuth Client Id.');
    }

    const options: VerifyOptions = {
      audience: process.env.OAUTH_CLIENT_ID,
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
    };

    jwt.verify(idToken, getKey, options, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError(err.message);
      }
      req.decodedCustomer = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default customerAuth;
