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
 * A general HTTP error class which contains the error message and status code
 * of an error.
 * Refer to https://www.restapitutorial.com/httpstatuscodes.html for more about
 * HTTP errors and status codes.
 */
export class HttpError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  get statusCode() {
    switch (this.constructor) {
      case BadRequestError:
        return 400;
      case UnauthorizedError:
        return 401;
      case ForbiddenError:
        return 403;
      case NotFoundError:
        return 404;
      case ConflictError:
        return 409;
      case InternalServerError:
      default:
        return 500;
    }
  }
}

// Client errors
export class BadRequestError extends HttpError {}
export class UnauthorizedError extends HttpError {}
export class ForbiddenError extends HttpError {}
export class NotFoundError extends HttpError {}
export class ConflictError extends HttpError {}

// Server errors
export class InternalServerError extends HttpError {}
