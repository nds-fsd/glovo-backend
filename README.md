# **glovo-backend** :rocket: :rocket:

![LogoBlack](https://user-images.githubusercontent.com/64317126/121247636-c593ff80-c8a2-11eb-9b8b-2786fdde2ddc.png)


### Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Additional](#additional)

## General info
This is the final project of the collaborators in a 'fullstack developer bootcamp'. Originally inspired in glovoapp.com and used to confirm the skills acquired in the bootcamp.
	
Here you will see:
- MongoDB schemas made with mongoose
- JWT scripts for securing the app
- Controllers and Routers for the apps
- docker-compose file to run locally


## Technologies
The core technologies used to create this project were :
* bcrypt version: 5.0.1
* cloudinary version: 1.25.1
* cors version: 2.8.5
* dotenv version: 8.2.0
* express version: 4.17.1
* express-jwt version: 6.0.0
* jsonwebtoken version: 8.5.1
* mongoose version: 5.11.8
* multer version: 1.4.2
* multer-storage-cloudinary version: 4.0.0
* nodemon: 2.0.6
    
	
## Setup

### Prerequisites
 You will need:
* [Docker](https://www.docker.com).
* a [Cloudinary](https://cloudinary.com/) account.

To run this project, you will need as well this [repo](https://github.com/nds-fsd/glovo-frontend).

Once is downloaded you will need to create a .env file with the following variables

```
// The database variables are defined in the docker-compose file

DATABASE_USER
DATABASE_PASSWORD
DATABASE_PORT
PORT=3001
JWT_SECRET

// The cloudinary variables are given by your cloudinary account

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

// The mail variables are given so nodemailer can send emails 
MAIL
MAIL_PASSWORD
```
install this locally with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

Via npm
```
$ npm install
$ docker-compose up -d
$ npm run devStart
```
Via Yarn
```
$ yarn install
$ docker-compose up -d
$ yarn run devStart
```


## Additional

Check out this repo for some e2e testing on the app :smile:
