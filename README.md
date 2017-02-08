# Todo app

Todo app using MEAN stack with modern versions of Mongo, Express, Angular 2, Node.
I tired of waiting for somebody nice to freely implement ready solution for all who interested in MEAN stack nowadays.
So I tried to experiment with new stack and try everything that needed for application.
Todo app can be a little bit overwhelming, but it is because I want to try everything that needed for real apps.

## Run locally

Please, check that your version of Node is 7.4.0 or higher.
In most cases app should work with 5+ Node versions, but 7.4.0 definitely works.
Don't forget to start [MongoDB](https://docs.mongodb.com/manual/installation/) before starting app.
Before run app:

    1. Install backend dependencies: `cd backend && npm install`
    2. Install frontend dependencies: `cd frontend && npm install`
    3. Install MongoDB and run with: `mongod &`
    
* If you want to check ready app on backend with served files go to `backend` and run `npm start`. On `localhost:9000` you will have ready app with served files.
* If you want to play with frontend go to `frontend` and run `npm start`. On `localhost:9001` you will have ready app with local frontend files.
* If you want to see frontend changes on backend:
    1. `cd frontend && npm run build`
    2. `cd ../backend && npm start`

## Structure

In this project exist two folders with backend and frontend.
When you go in particular folder you will see detailed structure description.
Structure of directories was generated with [tree](https://linux.die.net/man/1/tree).

## Features

*MongoDB*:

   * Get/Save/Update data in document
   * Get/Save/Update data for sub documents
    
*ExpressJS*:

   * Create app with express generator [express-generator](https://expressjs.com/en/starter/generator.html)
   * Configure server to have authentication, API and Frontend routes
   * Check passportJS for authentication
   * Serve files from public folder
   * Use [MongooseJS](http://mongoosejs.com/) to work with MongoDB and setup mongoose models
    
*Angular 2*:

   * Create app with [Angular-CLI](https://github.com/angular/angular-cli/blob/master/README.md)
   * Create simple component/service/guard
   * Work with Emitter
   * Work with Observables
   * Simple Unit testing
   * Simple End-2-End testing

*Node*:
	
* Actually I write all logic on Express so here just modern version of Node