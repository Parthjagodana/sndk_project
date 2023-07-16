<!-- GETTING STARTED -->
# Getting Started With Node.js
SNDK is a web application built using Node.js and MongoDB.
## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment_Variables](#environment-Variables)
- [Contributing](#contributing)

### Description
This project serves as an example of how to create a web application that utilizes the interaction between Node.js and MongoDB for efficient data storage and retrieval. It demonstrates the basic CRUD (Create, Read, Update) operations on a user entity.

## Features
- User registration and login with password hashing using bcryptjs.
- Integration with MongoDB database using Mongoose.
- Authorization middleware to protect routes.
- JWT-based Authorization: JWT is used for authentication and authorization, allowing access control to specific routes or resources based on user permissions.
- Multer File Upload: The application supports file uploads using the Multer middleware, enabling users to upload and store files.
- CORS (Cross-Origin Resource Sharing) A mechanism that allows controlled access to resources on a different origin.

### Installation

Below is an example of how you can instruct your audience on installing and setting up your Node Project.

1. Clone the repo
   ```sh
   git clone https://github.com/Parthjagodana/sndk_project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd sndk
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
## Usage

1. Make sure you have MongoDB installed and running on your system.
3. Start the application: `npm start`
4. Access the application at `http://localhost:3000` (or the specified port).

## Environment Variables

The following environment variables need to be set in the `.env` file or you can check I have set .env.default in project:
```
PORT=<The port number for the server to listen on>
JWT_SECRET=<The secret key for jwt token generation and verification>
BASE_URL=<The base URL used for any file base path manipulation>
MONGO_HOST=<The MongoDB host>
MONGO_PORT=<The MongoDB port>
MONGO_DB=<The MongoDB database name>
```

# Getting Started With Angular
SNDK is a web application built with Angular.
## Prerequisites

1. Node.js and npm: Ensure that Node.js and npm (Node Package Manager) are installed on your machine. You can download them from the [official Node.js website](https://nodejs.org).
2. Install Angular CLI from https://angular.io/guide/quickstart

### Installation

Below is an example of how you can instruct your audience on installing and setting up your Angular app.

1. Clone the repo
   ```sh
   git clone https://github.com/Parthjagodana/sndk_project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd sndk
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
## Usage

1. Run the development serve:
   ```sh
   npm start
   ```
2. Navigate to `http://localhost:4200/` in your browser to see the application.

## Scripts

These are the most useful commands defined in `package.json`:

* `ng`: Angular CLI command.
* `start`: Starts the development server.
* `build`: Builds the Angular application.
* `watch`: Builds the Angular application and watches for changes in the development environment.
* `test`: Runs unit tests.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push the changes to your fork: `git push origin my-feature-branch`.
5. Submit a pull request detailing your changes.