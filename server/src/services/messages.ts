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
  MICROAPPS_BASE_URL,
} from '../constants/spot-messages-api';

const SAMPLE_MESSAGE: Message = {
  imageUrl: 'https://media.rs-online.com/t_large/Y1747323-01.jpg',
  title: 'Hey there!!',
  text: 'Coffee to start your morning...',
  actions: [
    {
      label: 'Order Coffee',
      url: MICROAPPS_BASE_URL,
    },
  ],
  recipients: [
    {
      phoneNumber: {
        number: '+65 83053587',
      },
    },
  ],
};

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

/**
 */
export const sendMessage = async (message: Message = SAMPLE_MESSAGE) => {
  const client = new JWT({
    email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: [MESSAGES_SCOPE],
  });
  return client.request({
    url: MESSAGES_API_ENDPOINT,
    method: 'POST',
    data: JSON.stringify(message),
  });
};
