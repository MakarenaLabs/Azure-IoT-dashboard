# Azure Iot Dashboard
This project is a demo for reading data from Azure IoT Hub by using a clear and easily understandable UI.

## How to start this project
(Optional) Start simulating a device that connects to Azure IoT Hub as a Z7010 board:

`node device.js` 


Start a node.js server that reads the data from Azure IoT Hub and redirects them to web socket clients:

`node server.js`


Start the frontend:

`npm start`


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server for this dashboard. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
