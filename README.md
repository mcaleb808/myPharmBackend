# MY Pharmacy App

[![Build Status](https://travis-ci.org/mcaleb808/myPharmBackend.svg?branch=develop)](https://travis-ci.org/mcaleb808/myPharmBackend) [![Coverage Status](https://coveralls.io/repos/github/mcaleb808/myPharmBackend/badge.svg?branch=develop)](https://coveralls.io/github/mcaleb808/myPharmBackend?branch=develop)

> Making Medicine More Accessible

---

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/download/) if you dont have it installed.
- Install Postgresql to your system.
- Install [Sequelize-cli
  ](https://www.npmjs.com/package/sequelize-cli) and [Nodemon](https://www.npmjs.com/package/nodemon).

## Environment Setup

1. git clone this repository && cd to the project directory
2. with postgres create 2 databases : `one for test and another for development`
3. run `yarn install` to install dependencies
4. create a `.env` file in the root project directory
5. copy the `.env.example` to the `.env` file and update it accordingly
6. run `yarn run migrate` to create the schemas
7. run `yarn run test` to run the application unit tests

## Testing specific endpoints:

Run the application with `yarn run dev` and open an API testing tool.

```
http://localhost:8000/api/v1/<endpoint>
```

#### Contributors

- [Musigwa Pacifique](https://github.com/Musigwa)
- [Mugisha Caleb](https://github.com/mcaleb808)
