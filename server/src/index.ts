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
 * @fileoverview This file is the main entrypoint for GPay Group Buy server.
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import {
  commitRouter,
  customerRouter,
  listingRouter,
  merchantRouter,
} from './api';
import errorHandler from './middleware/error-handler';
import errorMapper from './middleware/error-mapper';
import {NotFoundError} from './utils/http-errors';

const app: express.Application = express();
const router: express.Router = express.Router();

router.use('/commits', commitRouter);
router.use('/customers', customerRouter);
router.use('/listings', listingRouter);
router.use('/merchants', merchantRouter);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.WEB_URL,
    exposedHeaders: ['Location'],
  })
);
app.use(router);

// This handles routing errors.
app.use(() => {
  throw new NotFoundError('Not Found');
});

// Handles the sending of error messages to client.
app.use(errorMapper, errorHandler);

const localPort = process.env.NODE_ENV === 'test' ? 5001 : 5000;
const port = process.env.PORT || localPort;

// module.parent check to prevents the EADDRINUSE error for tests, following:
// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

const onStopSignal = () => {
  console.log('Termination signal received, exiting process..');
  process.exit(1); // eslint-disable-line no-process-exit
};

process.on('SIGTERM', onStopSignal);
process.on('SIGINT', onStopSignal);
process.on('SIGHUP', onStopSignal);
process.on('SIGUSR2', onStopSignal); // Nodemon uses this

export default app;
