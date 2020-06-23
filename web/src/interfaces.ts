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

export interface Image {
  url: string;
  alt?: string;
}

export interface Listing {
  id: number;
  merchantId: number;
  name: string;
  price: string;
  oldPrice: string;
  currency: string;
  imgUrl: string;
  description: string;
  deadline: string;
  minCommits: number;
  numCommits: number;
  numPaid: number;
  numCompleted: number;
  listingStatus:
    | 'ongoing'
    | 'successful'
    | 'paid'
    | 'completed'
    | 'unsuccessful';
}
