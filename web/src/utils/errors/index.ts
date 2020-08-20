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

export class GeneralError extends Error {}

export class ClientError extends GeneralError {}
export class ServerError extends GeneralError {}

export class BadRequestError extends ClientError {}
export class UnauthorizedError extends ClientError {}
export class ForbiddenError extends ClientError {}
export class NotFoundError extends ClientError {}
export class ConflictError extends ClientError {}
