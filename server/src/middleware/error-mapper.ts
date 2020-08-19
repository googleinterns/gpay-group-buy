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

import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../utils/http-errors';
import {
  StorageError,
  EntityAlreadyExistsError,
  EntityNotFoundError,
  PropertyMismatchError,
} from '../utils/storage-errors';

/**
 * Middleware that maps each StorageError to a HttpError and rethrow it.
 */
const errorMapper = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof StorageError) {
    switch (err.constructor) {
      case EntityAlreadyExistsError:
        throw new ConflictError(err.message);
      case EntityNotFoundError:
        throw new NotFoundError(err.message);
      case PropertyMismatchError:
        throw new BadRequestError(err.message);
      default:
        throw new InternalServerError(err.message);
    }
  }
  next(err);
};

export default errorMapper;
