<!-- ## Gateways

[[_TOC_]]

---

:scroll: **START**


### Introduction

This sample project is managing gateways - master devices that control multiple peripheral devices.

---

### Task description

Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.

A **Gateway** has:
- unique serial number (string);
- human-readable name (string);
- IPv4 address (to be validated);
- multiple associated peripheral devices;

Each **Peripheral Device** has:
- UID (number);
- vendor (string);
- date created;
- status (online/offline).

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service should allow:
- storing a new gateway;
- displaying information about all stored gateways (and their devices);
- displaying details about a single gateway;
- adding and removing a peripheral device from a gateway;

> Feel free to make assumptions for the design approach.

---

### Requirements

While implementing your solution **please take care of the following requirements**:

#### Functional requirements

- There is no need for UI;
- Prevent the gateway from receiving more than 10 peripheral devices;

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Unit tests;
- Use a framework of your choice, but popular, up-to-date, and long-term support versions are recommended.

--- -->

## Stack
- Backend: NodeJS + Express + MongoDB REST API 

- CRUD Operations: create/read/update/delete gateways and peripherals

### Installation

```sh
git clone https://oauth:glpat-2r4Q5zpjfpstAZCfPrFy@gitlab.com/musala_soft/DEV_GATEWAYS-0c403a10-b50c-21b3-ce88-b55586b2c90b.git
cd DEV_GATEWAYS-0c403a10-b50c-21b3-ce88-b55586b2c90b
npm i
npm run dev # run in development mode
npm start # run in production mode
```

> You need to have Mongodb installed Locally or stablish a MONGODB_URI environment variable in order to connect to any mongodb instance (using Mongodb Atlas for example)

### Environment Variables

Rename the file `.env.template` to `.env` and adjust the variables values properly
    
This app needs the following environment Variables

- `MONGODB_URI` this is the Mongodb URI string
- `PORT` the server http port for the application

### docker-compose

The most easy way to install the entire project is using docker-compose:

```shell
git clone https://oauth:glpat-2r4Q5zpjfpstAZCfPrFy@gitlab.com/musala_soft/DEV_GATEWAYS-0c403a10-b50c-21b3-ce88-b55586b2c90b.git
cd DEV_GATEWAYS-0c403a10-b50c-21b3-ce88-b55586b2c90b
docker-compose up
```


### Testing environment
1. Rename the file `.env.template` to `.env-test` and adjust the variables values properly
2. Run `docker-compose -f docker-compose.test.yml run node npm run test`

:scroll: **END** 
