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

import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

const firebaseAuth = firebase.auth();

const getSignedInUser = (): Promise<firebase.User> => {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (!user) {
        reject(new Error('User not logged in'));
        return;
      }

      resolve(user);
    });
  });
};

export const getFirebaseIdToken = async (): Promise<string> => {
  const user = await getSignedInUser();
  return user.getIdToken();
};

export const getFirebaseUid = async (): Promise<string> => {
  const user = await getSignedInUser();
  return user.uid;
};

export default firebaseAuth;
