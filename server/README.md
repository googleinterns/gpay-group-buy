# GPay Group Buy Server

This is the Group Buy server which serves the web client through REST API.

## Prerequisites
Install [Node 10](nodejs.org) and [Yarn](classic.yarnpkg.com/en/docs/install/).

## Getting Started

### Environment Variables

You can find development environment variables in the `.env.development` file
, and production environment variables in the `app.yaml` file.

Some environment variables with the `<Secret>` tag are not meant to be exposed in this repo. Please make a copy of these variables in the appropriate local files `.env.development.local` and `app.secret.yaml` with valid values. These local files are ignored by git and will overwrite the `<Secret>` values.

For example, the `app.secret.yaml` file will look like

```
env_variables:
  OAUTH_CLIENT_ID: "real-oauth-client-id"
```

## Development

In the project directory, you can run:

### `gcloud auth application-default login`
This will ask you to log in to your google account.
Log in to enable access to the database from your local machine.

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

### `yarn test`

Runs all tests. We are using [Jest](https://jestjs.io/) as our test framework, alongside [supertest](https://github.com/visionmedia/supertest)
to test API endpoints.

Make sure that you already have the local datastore emulator running in another terminal.
Refer to the section on `yarn test:emulator` on how to run the emulator.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn test:emulator`

Runs the gcloud datastore emulator. Ensure that you already have the datastore emulator installed on your machine.
Refer to the section on "Running tests locally" on installation instructions.

### `yarn clean`

Removes output files.

### `yarn compile`

Compiles the source code using TypeScript compiler.

## Project Structure

```
└── src
    ├── api            # Express route controllers for all endpoints
    ├── constants      # All constants used in the code
    ├── models         # Database models
    ├── services       # Business logic handlers
    └── index.ts       # Server entry point
```

### `api`, `models` and `services` Folder Structure

Each of these folders contain the following files:

```
├── commits.ts         # Commit-related functions
├── customers.ts       # Customer-related functions
├── index.ts           # Entry point to all the functions in this folder
├── listings.ts        # Listing-related functions
└── merchants.ts       # Merchant-related functions
```

### `constants` Folder Structure

Each file in this folder contains a group of constants that are closely related.
The file name specifies the constants inside it.

## Configuring Database

### Configuring Indexes

In Datastore, single-property indexes are built in and do not need to be created.

To make changes to composite indexes, edit `index.yaml` file accordingly and then deploy using the following command:

```
gcloud app deploy index.yaml
```

That command only adds new indexes. The original index is not deleted automatically in case it is still used by an
older version of the app. To remove unused old indexes, use the following command:

```
gcloud datastore indexes cleanup index.yaml
```

It may take some time for Datastore to prepare these indexes before they are ready to serve.

For more information regarding the format of the `index.yaml` file, see
[this page](https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-datastore-indexes-with-index-yaml).

## Running tests locally

### Installing Google Cloud Datastore Emulator

Our integration tests requires the Google Cloud Datastore Emulator to be running locally on your machine.
[Google Cloud documentation](https://cloud.google.com/datastore/docs/tools/datastore-emulator) contains some instructions on how to set the emulator up.
If that works for you, that's great!
But if you run into problems during installation on the Chromebook, please follow this guide instead.

When attempting to install the emulator, you might face this error:

```
E: Package 'openjdk-8-jdk' has no installation candidate
```

This is because the Chromebook is running debian 10 which uses the "stable" package list, which does not include `openjdk-8-jdk`.
`openjsk-8-jdk` is only available in the older package list (stretch) and newer package list (sid).
In this tutorial, we will download the stretch package manually and then install it via dpkg.

Run this in your terminal to download `openjdk-8-jdk`:

```
sudo wget http://security.debian.org/debian-security/pool/updates/main/o/openjdk-8/openjdk-8-jre-headless_8u252-b09-1\~deb9u1_amd64.deb \
http://security.debian.org/debian-security/pool/updates/main/o/openjdk-8/openjdk-8-jre_8u252-b09-1\~deb9u1_amd64.deb \
http://security.debian.org/debian-security/pool/updates/main/o/openjdk-8/openjdk-8-jdk-headless_8u252-b09-1\~deb9u1_amd64.deb \
http://security.debian.org/debian-security/pool/updates/main/o/openjdk-8/openjdk-8-jdk_8u252-b09-1\~deb9u1_amd64.deb
sudo dpkg -i --force-all openjdk-8-jre-headless_8u252-b09-1~deb9u1_amd64.deb openjdk-8-jre_8u252-b09-1~deb9u1_amd64.deb openjdk-8-jdk-headless_8u252-b09-1~deb9u1_amd64.deb openjdk-8-jdk_8u252-b09-1~deb9u1_amd64.deb
```

To check that you have successfully installed `openjdk-8-jdk`, run:

```
update-alternatives --display java
```
Ensure that you see `/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java` as one of the options.

Now run:

```
sudo update-alternatives --config java
```

And select the `/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java` option.

Now you can finally install the datastore emulator using either

```
gcloud components install cloud-datastore-emulator
```

or

```
sudo apt-get install google-cloud-sdk-datastore-emulator
```
Congratulations, you can now start running your emulator to run integration tests locally!

### Running tests with the Google Cloud Datastore Emulator

We need the datastore emulator to be running in another terminal window on the same machine in order to run our tests. To do so, run:

```
yarn test:emulator
```

Now open up a new terminal and run:

```
yarn test
```
