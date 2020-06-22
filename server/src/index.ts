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
 * @author Karen Frilya Celine
 */

import express from 'express';

import {
  commitRouter,
  customerRouter,
  listingRouter,
  merchantRouter,
} from './api';

const app: express.Application = express();
const router: express.Router = express.Router();

router.use('/commits', commitRouter);
router.use('/customers', customerRouter);
router.use('/listings', listingRouter);
router.use('/merchants', merchantRouter);

app.use(router);

// This handles server errors.
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      },
    });
  }
);

// This handles routing errors.
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send({
      status: 404,
      error: 'Not Found',
    });
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const stopHandler = () => process.exit(1); // eslint-disable-line no-process-exit

process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);
process.on('SIGHUP', stopHandler);
