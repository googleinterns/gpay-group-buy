# GPay Group Buy Server

This is the Group Buy server which serves the web client through REST API.

## Prerequisites
Install [Node 10](nodejs.org) and [Yarn](classic.yarnpkg.com/en/docs/install/).

## Development

In the project directory, you can run:

### `yarn`
This will install all of the dependencies you need.

### `yarn start`

Runs the app in the development mode.<br />
Receives REST API requests at [http://localhost:5000](http://localhost:5000).
You can use [Postman](https://www.postman.com/downloads/) to send REST requests
and view the responses.<br />

The page will reload if you make edits.

### `yarn lint`

Lints and check for formatting problems using Google TypeScript Style (gts).

### `yarn fix`

Automatically fixes formatting and linting problems (if possible) using gts.

### `yarn clean`

Removes output files using gts.

### `yarn compile`

Compiles the source code using TypeScript compiler.
