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
  commitsRouter,
  customersRouter,
  listingsRouter,
  merchantsRouter,
} from './api';

const app: express.Application = express();
const router: express.Router = express.Router();

router.use('/commits', commitsRouter);
router.use('/customers', customersRouter);
router.use('/listings', listingsRouter);
router.use('/merchants', merchantsRouter);

app.use(router);

// handles server error
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

// handles routing error
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send({
      status: 404,
      error: 'Not Found',
    });
  }
);

const port = process.env.port || 5000;
app.listen(port);
console.log(`Listening on port ${port}`);
