# SKY MEAN app

If in trouble with the setup please chase me on Skype at "lukasz.prus." or email me at "lucas.prus@gmail.com".

I use ExpressJS on the backend. Sign in attempts are stored in a MongoDB database hosted by https://www.compose.io/. Mongoose driver is used to communicate between the two. Ping me on Skype/email and I will give you access to the DB so you can see records updating as a user tries to sign in.

Session is maintained by session cookies. Note that session age is set to 20 seconds. That can be customized in app.js file.

On the fronted I started off from a Yeoman scaffold for an Angular project.

## Local setup

Run the following from the root folder of the project

### Install global Node packages if not already present

```shell
npm install -g grunt-cli
npm install -g bower
npm install -g karma
npm install -g karma-cli
```

### Install dependencies

```shell
npm install
bower install
```

### Add Compose(MongoHQ) service login credentials as environment variables

```
DATABASE_USER: admin
DATABASE_PASSWORD: c7241vD136g8l9S
```

### Run unit tests

```shell
grunt test
```
### Run e2e tests

Make sure protractor is set up: http://angular.github.io/protractor/#/tutorial. Then run

```shell
protractor e2eTest/protractor.conf.js
```

### Build production version

```shell
grunt build
```

### Start the app

```shell
node app
```

Development version

http://localhost:3000/

Production version

http://localhost:3000/production/

## Heroku live demo

Demo is hosted on a free Heroku plan so it might take a few seconds to wake it up.

Development version

http://sky-mean-app.herokuapp.com/

Production version

http://sky-mean-app.herokuapp.com/production/
