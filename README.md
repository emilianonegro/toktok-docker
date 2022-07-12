# TokTok

This app we will be using:

- angular for the frontend part
- nodejs backend with express module and typeScript
- mongodb for data storage

### With Docker

#### To start the application

Frontend part:
Inside /frontend-toktok-docker

Step 1: docker build -t front-toktok -f Dockerfile front .
Step 2: docker run -it -p 4200:4200 front-toktok

Backend part:
Inside /back-toktok-docker

1- docker-compose up --build -d

<!-- 1- docker build -t back-toktok -f Dockerfile back
2- docker run -it -p 3000:3000 back-toktok -->
