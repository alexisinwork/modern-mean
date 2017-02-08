# Frontend for TODO app

Todo app was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

## Structure

	frontend
      ├── e2e                           // All End-2End tests
      └── src                           // Main folder with all files
        ├── app                       // All Angular 2 files
        │   ├── components            // All components of app
        │   │   ├── header            // Header with username and profile icon
        │   │   ├── login             // Login page to auth user
        │   │   ├── not-found         // If route not found show this component
        │   │   ├── profile           // Page with user info
        │   │   ├── title             // Reusable component with main info
        │   │   ├── todo              // Todo page for current user
        │   │   └── todo-details      // Details of todo
        │   └── services              // All services of application
        │       └── guards            // Guards folder
        ├── assets                    // All files like images placed here
        └── environments              // If you need different prod, test environments


## All commands available with short description:

```js
npm run ng      // use your local version og angular-cli
npm start       // start frontend part of app
npm run build   // build bundle file of frontend part for backend and save in public folder
npm run lint    // lint all your files
npm test        // run all unit tests
npm run pree2e  // update/download new version of webdriver 
npm run e2e     // run e2e tests
```

## Start development server

Run `npm start` for a dev server. Navigate to `http://localhost:9001/`. The app will automatically reload if you change any of the source files.

## Code scaffolding (generate component/service/pipe)

Run `npm run ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `../backend/public` directory. For build automatically used production build.
All other type of files like images or text always put in src/assets, because they also bundled in build process.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Tests are running in watch mode.

## Running end-to-end tests

Run `npm run pree2e` to update webdriver.
Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `npm run ng github-pages:deploy` to deploy to Github Pages.
I personally didn't use it, so better read DOCS on angular-cli project.

## Further help

To get more help on the `angular-cli` use `npm run ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
