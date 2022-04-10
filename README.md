
## Solution
This is an API microservice application that authorizes a transaction for a specific account following a set of predefined rules.

## Requirements
* [Docker 19.03 runtime or latest](https://docs.docker.com/install/)
* [node v13.14.0 for api local testing](https://nodejs.org/en/download/)

## Tests

```sh

cd /<api_folder>
npm install
npm run test

```

## Running the app


```sh
cd /<api_folder>
docker build -t authorizer-api-runtime .
docker run --rm -it -p 8080:8080 -e SERVER_URL=192.168.99.100:8080 authorizer-api-runtime

```

Set `SERVER_URL` variable environment if necessary which should reflect Server URL address.
`Default value = localhost:8080`

## Swagger

http://endpoint-address:8080/api-docs/

## API Timezone  

`UTC 0`

## Folder Structure 

```

authorizer-api
│   index.js        # Api entry point
└───api             # Express route controllers for all the endpoints of the api
└───models          # Database models
└───services        # All the business logic is here
└───test            # Testing module

```