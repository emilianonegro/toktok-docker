# TokTok App

This app we will be using:

- Angular for the frontend part.
- NodeJS backend with express module and typeScript.
- Mongodb for data base.

### With Docker

#### To start the application

**To start The Docker-Compose:**

    docker-compose up --build -d    

**Ports:**

- Port nodeJs:      `http://localhost:3000`
- Port mongodb: `http://localhost:3000`
- Port Angular:    `http://localhost:4200`

#### To build a docker image from the application

    docker build -t my-app:1.0 .       

The dot "." at the end of the command denotes location of the Dockerfile.