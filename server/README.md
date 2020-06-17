# GPay Group Buy Server

This is the Group Buy server which serves the web client through REST API.

## Prerequisites
Install [Node 10](nodejs.org) and [Yarn](classic.yarnpkg.com/en/docs/install/).

## Development

In the project directory, you can run:

### `yarn`
This will install all of the dependencies you need.

### `yarn start`
Runs the app compiled using `yarn compile` for production mode.
To run the most updated version of your code, make sure to run `yarn compile`
before running `yarn start`.

### `yarn start:dev`

Runs the app in the development mode.<br />
Receives REST API requests at [http://localhost:5000](http://localhost:5000).
You can use [Postman](https://www.postman.com/downloads/) to send REST requests
and view the responses.<br />

The page will reload if you make edits.

### `yarn lint`

Lints and check for formatting problems according to [Google Typescript Style](https://github.com/google/gts).

### `yarn fix`

Automatically fixes formatting and linting problems (if possible) according to
[Google Typescript Style](https://github.com/google/gts).

### `yarn clean`

Removes output files.

### `yarn compile`

Compiles the source code using TypeScript compiler.

## Project Structure

```
├── src
│   ├── api          # Express route controllers for all endpoints
│   ├── models       # Database models
│   ├── services     # Business logic handlers
│   └── index.ts     # Server entry point
```

### `api`, `models` and `services` Folder Structure

Each of these folders contain the following files:

```
├── commits.ts       # Commit-related functions
├── customers.ts     # Customer-related functions
├── index.ts         # Entry point to all the functions in this folder
├── listings.ts      # Listing-related functions
└── merchants.ts     # Merchant-related functions
```
