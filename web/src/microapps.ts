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

import {isAfter, getMilliseconds} from 'date-fns';
import {CustomerIdentity} from 'interfaces';

/**
 * Microapps API.
 */
const microapps = window.microapps;

let cachedIdentity: CustomerIdentity;

/**
 * Decodes a base64 microapps identity token.
 * Method taken from https://developers.google.com/pay/spot/eap/reference/identity-api#full_example.
 * @param idToken The token to be decoded
 */
export const decodeToken = (idToken: string) =>
  JSON.parse(atob(idToken.split('.')[1]));

/**
 * Gets microapps identity token and its decoded form.
 * Returns the cached identity if it exists and token has not expired,
 * else, fetches a new identity token from the microapps API.
 */
export const getIdentity = async (): Promise<CustomerIdentity> => {
  const cachedTokenExpiry = cachedIdentity?.decodedToken.exp;
  if (
    cachedIdentity !== undefined &&
    isAfter(cachedTokenExpiry, getMilliseconds(Date.now()))
  ) {
    return cachedIdentity;
  }

  const idToken = await microapps.getIdentity();
  const decodedToken = decodeToken(idToken);
  const newIdentity = {
    idToken,
    decodedToken,
  };

  cachedIdentity = newIdentity;
  return newIdentity;
};

export default microapps;
