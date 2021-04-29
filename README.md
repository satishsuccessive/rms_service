# Overview

DAN Kitchen Sink (services), is a basic application from where a developer can start a new service. It showcase all (or almost all) of the features or say best practices that we can use in an API.
# Technology Stack
 * [Node.js](https://nodejs.org) server.
 * [MongoDB](https://docs.mongodb.com/) database.
 * [mongoose](http://mongoosejs.com/) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box for MongoDB.
 * [TypeScript](https://www.typescriptlang.org/docs/home.html)
 * [Express](https://expressjs.com/) node.js framework for building REST APIs
 * [Docker](https://en.wikipedia.org/wiki/Docker_(software)) To setup similar production and development environment
 * [Jest](https://jestjs.io/docs/en/getting-started) Jest is used to test Javascript frameworks
 * [Supertest](https://www.npmjs.com/package/supertest) provide a high-level abstraction for testing HTTP


# Key Features

1. **src/config:**:
	This folder has two main files as of now 
    * `configuration.ts` which contains all the configurable variables required in the service. Use this file to add any new variable. This file basically picks up variables from `environment (process.env)`, will use default if not found. In order to set these variables create a `.env` file (similar to `.env-example` file)
    * `logger.ts` which will request our logger service
2. **src/controllers:** it contains all the features required in this service with each feature in separate folder, currently, there is only one demo feature named `home`, different files are there in the home folder:
	* `controller.ts` contains all the methods related with that feature, called on an API endpoint request
	* `route.spec.ts` contains test scripts for this feature's API requests
	* `route.ts` contains all the routes related with this feature
	* `validation.ts` contains validation for request parameters or data
3. **src/entities:** This folder includes the entites and dto's that we are exposing from our API's. `IEntity.ts` file includes the main interface for entities. `IVersionable.ts` includes the interface for versioning fields
4. **src/libs:**:
	This folder has soe common libraries or classes which we can use in our services, in future we can create a separate package for this. Currently, it has two folders and few files:
    * `errors` it has classes to handle API errors
    * `routes` it has error handler and not found routes
    * `controllerHandler.ts` it is a middleware to capture request, check for params validity, call respective controller method and send response back. works as a gateway between your input and the domain logic, is decides what to do with the input and how to output the response
    * `Database.ts` DB connection
    * `Nullable.ts` Generic nullable and undefinedable types (Nullable<E> instead of E|null)
    * `Swagger.ts` Swagger class and related methods
    * `SystemResponse.ts` Different types of API response with appropriate code
5. **src/repositories:** The Data Access Layer that contains all repositories. Repositories use models for accessing DB
    * `models` contains all the Mongo schemas and related methods
6. **src/services:** Abstraction for file system process or third party end points etc.
7. **src/types:** folder will have definitely typed files (`d.ts`) for modules that doesn't have types defined
8. **src/index.ts:** Creates the server instance and runs it
9. **src/router.ts:** file includes main routes and call the features route, like, all the home related routes will mount to `/homes` route
10. **src/Server.ts:** The main class that creates the express server


# Getting Started - Setup

This section is for getting started with Kue server on your development environment.

1. **Clone the repository**
  ```
  git clone <link>
  ```
2. **Create Docker Network**
  ```
  docker network create -d bridge dentsu
  ```

3. **Launch the app via Docker**
  This is the recommended way to run the system during development.

  - Install Docker ([instructions for ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository))
  - Install docker-compose ([how to install](https://docs.docker.com/compose/install/))
  - Launch: `sudo docker-compose up -d`


4. **To stop the containers**

   `sudo docker-compose stop`

Now you can expect automatic live reloading whenever you made changes to ```src``` or ```public``` folder.

You can access the api at http://localhost:9000/

**Note:** Use of `sudo` is required with a basic Docker installation. To remove the necessity of `sudo` (for example when setting up a production deploy), you can follow these instructions: [Post-installation steps for Linux - Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user). This is highly recommended.


#### Rebuild Image

**Note**: If dependencies in `package.json` change or any other files except files inside `src` and `public` folders, you need to rebuild the image before launching again (will re-run `npm install` for the image)

`docker-compose build --force-rm --no-cache`

To rebuild the image without clearing cache:
`docker-compose build app`

# Testing
We use unit tests with [Jest](https://github.com/facebook/jest) in this project.

- To run tests

  ```
  docker-compose run --no-deps --rm dan-kitchen-sink-service yarn test
  ```

- To run tests in watch mode

  ```
  docker-compose run --no-deps --rm yarn dan-kitchen-sink-service watch-test
  ```

# Linting
We also use [tslint](https://palantir.github.io/tslint/) with Typescript Standard Style.

- To run lint:

  ```
  sudo docker-compose run --no-deps dan-kitchen-sink-service yarn lint
  ```

- To automatically fix doable linting errors:

  ```
  sudo docker-compose run --no-deps dan-kitchen-sink-service yarn lint:fix
  ```


# Workflow

## Commit Command [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

To commit your files to git use `yarn commit` instead of `git commit`, it will open an interactive view to enter your commit message and rest of the arguments will remain same as "git commit"

Please note: Other commands like `git add` etc will remain the same.

Incase if above command will not work then run following command and then try again.
`./node_modules/.bin/commitizen or ./node_modules/.bin/git-cz`

#### Development Category
For commit message or branch name we will use following categories:
  - feat (feature)
  - fix (bug fix)
  - docs (documentation)
  - style (formatting, missing semi colons, etc)
  - refactor
  - test (when adding missing tests)
  - chore (maintain)

#### Format of Commit Message

```
  <DEVELOPMENT CATEGORY>: <SUBJECT>
  <BLANK LINE>
  <BODY>
  <BLANK LINE>
  <FOOTER>
```

#### BRANCHES

**Git flow** needs to be initialized in order to customize your project setup.

##### Initialize
  ```
  git flow init
  ```

##### Features
Develop new features for upcoming releases.

- Start a new feature:

    ``` git flow feature start MYFEATURE ```

- Finish a feature:

    ``` git flow feature finish MYFEATURE ```

- Publish a feature

    ``` git flow feature publish MYFEATURE ```

- Getting a published feature

    ``` git flow feature pull origin MYFEATURE ```

##### Release
Support preparation of a new production release
Allow for minor bug fixes and preparing meta-data for a release

- Start a new release:

    ``` git flow release start RELEASE ```

- Finish a release:

    ``` git flow release finish RELEASE ```

    **IMP:** Don't forget to do ```git push --tags```

- Publish a release

    ``` git flow release publish RELEASE ```

- Getting a release feature

    ``` git flow release pull origin RELEASE ```


##### Hotfixes
Hotfixes arise from the necessity to act immediately upon an undesired state of a live production version

- Start a new hotfix:

    ``` git flow hotfix start VERSION ```

- Finish a release:

    ``` git flow hotfix finish RELEASE ```




### CI Integration
  - TODO

### Guidelines - must be followed strictly
  - Developer must commit his tasks at the end of the day, even if the task has not been completed
  - Developer must create a pull request at the end of day, even if the task has not been completed, with a SUFFIX in subject name as `[WIP]:` e.g 
  `[WIP]: Setup of Jest with first unit test`

### IDE
Our preferred IDE is `VSCODE`

Please enable following plugins for your editor:
- **EditorConfig:** To enable reading of .editorconfig file for consistent coding convention.
- **SonarLint:** To enable error catch by sonarjs.
- **TSlint:** For linting errors
