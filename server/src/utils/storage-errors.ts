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
 * A general storage error class which contains the error message of an error.
 * Refer to https://cloud.google.com/datastore/docs/concepts/errors for more about
 * Datastore errors.
 */
export class StorageError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

/**
 * Indicates an attempt to insert an entity that already exists.
 */
export class EntityAlreadyExistsError extends StorageError {}

/**
 * Indicates an attempt to perform a storage operation on an entity that does
 * not exist.
 */
export class EntityNotFoundError extends StorageError {}

/**
 * Indicates an attempt to perform an update operation on an entity's property,
 * but the property does not exist on the existing entity.
 */
export class PropertyMismatchError extends StorageError {}
