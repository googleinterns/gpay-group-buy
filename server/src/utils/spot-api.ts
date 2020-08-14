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

import {JWT} from 'google-auth-library';

import {
  MESSAGES_API_ENDPOINT,
  MESSAGES_SCOPE,
  MICROAPP_BASE_URL,
} from '../constants/spot-api';

interface ActionButton {
  label: string;
  url: string;
}

interface PhoneNumberRecipient {
  // Phone number in the format of country code appended by national number (as defined
  // by the International Telecommunication Union (ITU)) and separated by space.
  phoneNumber: {[number: string]: string};
}

interface Message {
  imageUrl: string;
  title: string;
  text: string;
  actions: ActionButton[];
  recipients: PhoneNumberRecipient[];
}

const spotClient = new JWT({
  email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
  key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
  scopes: [MESSAGES_SCOPE],
});

/**
 * A function that sends a message to the customer using Spot Messages API.
 * @param message The message to be sent
 */
export const sendMessage = async (message: Message) => {
  return spotClient.request({
    url: MESSAGES_API_ENDPOINT,
    method: 'POST',
    data: JSON.stringify(message),
  });
};

/**
 * Encodes URL path according to the Spot URL rules.
 * @param path Relative path of the app to be shared
 */
export const encodeMicroappsUrl = (path?: string): string => {
  if (path === undefined || path === '/') {
    return MICROAPP_BASE_URL;
  }

  return `${MICROAPP_BASE_URL}?link=${encodeURIComponent(path)}`;
};
