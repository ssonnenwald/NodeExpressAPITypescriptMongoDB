# Node Express API Typescript MongoDB

[![GitHub forks](https://img.shields.io/github/forks/ssonnenwald/NodeExpressAPITypescriptMongoDB)](https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB/network)
![commit activity](https://img.shields.io/github/commit-activity/w/ssonnenwald/NodeExpressAPITypescriptMongoDB.svg)
![last commit](https://img.shields.io/github/last-commit/ssonnenwald/NodeExpressAPITypescriptMongoDB.svg)
[![GitHub license](https://img.shields.io/github/license/ssonnenwald/NodeExpressAPITypescriptMongoDB)](https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB/blob/master/LICENSE)
![GitHub issues](https://img.shields.io/github/issues/ssonnenwald/NodeExpressAPITypescriptMongoDB.svg)
![GitHub contributors](https://img.shields.io/github/contributors/ssonnenwald/NodeExpressAPITypescriptMongoDB.svg)

## General

A Node Express API in Typescript with the MongoDB.

## Initial Note

I will write more documentation about the project, but this is a VSCode project done in Typescript.  It is a NodeJS Express Web API using HTTPS.  I have done it in typescript instead of just javascript.  I have added swagger(openapi 3.0.1) to it.  I have also commented it and run TypeDoc on the project and the code documentation is generated in the docs folder.  The API uses the community version of MongoDB.

## What does the API do

This API is an example I made to demostrate CRUD operation using a very simple contact object.  So it will create new contact, update a contact, delete a contact and list the contacts.  Best way to understand the API is run the API and view the swagger documentation (<https://localhost:3000/swaggerui/).>

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Getting Started

You should install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) on your local machine.

After that, you will have to replace the mongoURL with your MongoDB address in **lib/app.ts**.

## Clone this repository

```
git clone https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB.git
```

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run dev
```

Run in production mode 

```
npm run prod
```

## Testing over HTTPS

The default URL is: **https://localhost:3000**

The **key** and **cert** in the **config folder** is for testing purpose only. You should generate your own.

## Securing the API

### HTTPS

The first and foremost is that you should always use HTTPS over HTTP.

For local testing, I will use [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html) on Windows to generate the key and certificate 
for **HTTPS** configuration.  The process is similar on Mac or Linux.
After installing OpenSSL, I will open OpenSSL and start generating key and cert files.

```
OpenSSL> req -newkey rsa:2048 -nodes -keyout keytemp.pem -x509 -days 365 -out cert.pem
    
OpenSSL> rsa -in keytemp.pem -out key.pem
```

After that, we will move **key.pem** and **cert.pem** files to our
project. They will be in the **config folder**.

Then we will edit the **server.ts** file to enable **https**.

```typescript
import app from './app';
import * as https from 'https';
import * as fs from 'fs';

const PORT = 3000;
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
}

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
```

## Database Setup - MongoDB

Make sure you have also installed Compass for MongoDB, its the GUI to manage the database.  

Start Compass
![Connect to server](https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB/blob/master/images/Capture.JPG)

Connect to the server.

Create a new database called **CRMdb**.
![Create new database](https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB/blob/master/images/Capture2.JPG)

Create a new collection in the database called **contacts**.![Create new collection](https://github.com/ssonnenwald/NodeExpressAPITypescriptMongoDB/blob/master/images/Capture3.JPG)

** Note:  After you setup MongoDB to connect to the database your connection URL will be whatever you used to connect in the setup.  In **lib/app.ts** change the line to match your connection.

```typescript
public mongoUrl: string = 'mongodb://localhost:27017/CRMdb';
```

## Microsoft VSCode
I am using vscode to edit and debug the application.

### Extensions
* Angular Snippets (Version 8)
* Comments in Typescript
* Debugger for Chrome
* DotENV
* ESLint
* GitLens--Git supercharged
* Markdown Preview Github Styling
* Markdown Shortcuts
* Markdown TOC
* markdownlint
* SQL Server (mssql)
* SQLTools - Database tools
* Swagger Viewer
* TSLint

## tsconfig.json
```yaml
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "pretty": true,
        "sourceMap": true,
        "target": "es6",
        "outDir": "./dist",
        "baseUrl": "./lib"
    },
    "include": [
        "lib/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "images",
        "docs"
    ]
}
```

This is the standard setup for a node project.  What I added in addition here is 
```json
"resolveJsonModule": true,
```
I added this so that my **lib/swagger.json** file would be picked up and validated against for my API documentation since I added swagger to the project.

## launch.json
```yaml
"version": "0.2.0",
"configurations": [
    {
        "name": "TS Node",
        "type": "node",
        "request": "launch",
        "args": ["${workspaceRoot}/lib/server.ts"],
        "runtimeArgs": [
            "--nolazy",
            "-r",
            "ts-node/register"
        ],
        "sourceMaps": true,
        "cwd": "${workspaceRoot}",
        "protocol": "inspector",
        "env": {
            "NODE_ENV": "development",
            "TS_NODE_PROJECT": "./tsconfig.json"
        },
        "serverReadyAction": {
            "action": "debugWithChrome",
            "pattern": "^\\s*Express server listening on port 3000\\s",
            "uriFormat": "https://127.0.0.1:3000/swagger/"
        }
    }
]
```
The **launch.json** file sets up the debugger in vscode so that you can launch and debug the API.  The first part of this starts and launches the API, but if you want to also start swagger along with this then **serverReadyAction** section is needed to startup chrome and display the swagger ui page.