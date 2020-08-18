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
import {
  CustomerIdentity,
  DecodedPhoneNumberToken,
  DecodedToken,
  DecodedIdentityToken,
} from 'interfaces';

/**
 * Microapps API.
 */
const microapps = window.microapps;

const MICROAPP_BASE_URL = `https://microapps.google.com/${process.env.REACT_APP_SPOT_ID}`;

let cachedIdentity: CustomerIdentity;
let cachedDecodedPhoneNumberToken: DecodedPhoneNumberToken;

/**
 * Decodes a base64 microapps identity token.
 * Method taken from https://developers.google.com/pay/spot/eap/reference/identity-api#full_example.
 * @param token The token to be decoded
 */
export const decodeToken = (token: string): DecodedToken =>
  JSON.parse(atob(token.split('.')[1]));

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
  const decodedToken = decodeToken(idToken) as DecodedIdentityToken;
  const newIdentity = {
    idToken,
    decodedToken,
  };

  cachedIdentity = newIdentity;
  return newIdentity;
};

/**
 * Encodes URL path according to the Spot URL rules.
 * @param path Relative path of the app to be shared
 */
const encodeMicroappsUrl = (path?: string): string => {
  if (path === undefined) {
    return MICROAPP_BASE_URL;
  }

  // Get rid of the leading '/'
  const pathLink = path.slice(1);

  return `${MICROAPP_BASE_URL}?link=${encodeURIComponent(pathLink)}`;
};

/**
 * Triggers sharing of a specified path in the microapp.
 * If path is not specified, MICROAPP_BASE_URL will be shared.
 * @param title Sharing title
 * @param text Sharing text
 * @param path Relative path of the app to be shared
 */
export const requestSharing = async (
  title?: string,
  text?: string,
  path?: string
): Promise<void> =>
  microapps.requestSharing({
    title,
    text,
    url: encodeMicroappsUrl(path),
  });

/**
 * Gets GPay phone number of user.
 * Returns the cached phone number if it exists and has not expired,
 * else, fetches a new identity token from the microapps API.
 */
export const getPhoneNumber = async () => {
  const cachedTokenExpiry = cachedDecodedPhoneNumberToken?.exp;
  if (
    cachedDecodedPhoneNumberToken === undefined ||
    isAfter(getMilliseconds(Date.now()), cachedTokenExpiry)
  ) {
    const phoneNumberToken = await microapps.getPhoneNumber();
    cachedDecodedPhoneNumberToken = decodeToken(
      phoneNumberToken
    ) as DecodedPhoneNumberToken;
  }

  return cachedDecodedPhoneNumberToken.phone_number;
};

export default microapps;
