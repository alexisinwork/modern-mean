# Backend for TODO app

Todo app was generated with [express-generator](https://expressjs.com/en/starter/generator.html) version 4.14.0.

## Start server

You can start server with `npm start`.

## Structure

    backend
    ├── bin         // Node file that really starts server
    ├── models      // Mongoose models
    ├── public      // Static files to serve
    ├── routes      // API routes
    │   └── rest    // helpers to reduce amount of code in API
    └── views       // Error template if error in routes
    |__ app.js      // Starting server and configure everything
    
