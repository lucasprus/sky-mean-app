# sky-mean-app

## Local setup:

Run the following from the root folder of the project:

### Install global Node packages if not already present:

```shell
npm install -g grunt-cli
npm install -g bower
npm install -g karma
npm install -g karma-cli
```

### Install dependencies:

```shell
npm install
bower install
```

### Add Compose(MongoHQ) service login credentials as environment variables:

```
DATABASE_USER: admin
DATABASE_PASSWORD: c7241vD136g8l9S
```

### Run tests

```shell
grunt test
```

### Build production version:

```shell
grunt build
```

Start the app:

```shell
node app
```

Development version:

http://localhost:3000/

Production version:

http://localhost:3000/production/

## Heroku live demo:

Development version:

http://sky-mean-app.herokuapp.com/

Production version:

http://sky-mean-app.herokuapp.com/production/

