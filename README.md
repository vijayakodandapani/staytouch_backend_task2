# vijaystaytouch_backend_task2


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Features

crud operations with image upload to s3 bucket using graphql api built on docker container

### Prerequisites

What things you need to install the software and how to install them

```
Node@v12.x.x
PostgreSql@12.x
Docker
```

### Installing

A step by step series that will tell you how to get a development env running

```
$ npm install

```
Create Database:

```
| keyword       | Example                         |Description                        |
| ------------- | -----------------------------   |---------------------------------- |
| dialect       | postgres                        |Database we are using              |
| username      | postgres                        |Username for the database          |
| password      | Krify@123                       |Password for the database          |
| host          | localhost                       |Host on which database is running  |
| port          | 5432                            |Port for the database              |
| database_name | staytouch                       |Database name|
 
## Run the Server
## Without docker
```
$ npm run start

```
##With Docker container
```
$ docker build  -t  test:latest . 

$ docker run  -it  test:latest .

$ docker run -it -d -p 4000:3000 test:latest 
```
