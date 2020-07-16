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

/**
 * ResponseId type is the union type of datastore's built-in id.
 */
export type ResponseId = number | Long | string | null;

/**
 * UpdateOperation contains the possible update operation options.
 */
export type UpdateOperation = 'add' | 'subtract' | 'replace';

/**
 * UpdateRule contains the rules for the updating of an Entity.
 */
export interface UpdateRule {
  property: string;
  value: any;
  op?: UpdateOperation;
}
