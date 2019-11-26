# Node Express API Typescript MongoDB

## General

A Node Express API in Typescript with the MongoDB.

## Initial Note

I will write more documentation about the project, but this is a VSCode project done in Typescript.  It is a NodeJS Express Web API using HTTPS.  I have done it in typescript instead of just javascript.  I have added swagger(openapi 3.0.1) to it.  I have also commented it and run TypeDoc on the project and the code documentation is generated in the docs folder.  The API uses the community version of MongoDB.

## What does the API do

This API is an example I made to demostrate CRUD operation using a very simple contact object.  So it will create new contact, update a contact, delete a contact and list the contacts.  Best way to understand the API is run the API and view the swagger documentation (<https://localhost:3000/swaggerui/).>

## Securing the API

### HTTPS

The first and foremost is that you should always use HTTPS over HTTP.

For local testing, I will use [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html) on Windows to generate the key and certificate for HTTPS configuration.  The process is similar on Mac or Linux.
After installing OpenSSL, I will open OpenSSL and start generating key and cert files.

    OpenSSL> req -newkey rsa:2048 -nodes -keyout keytemp.pem -x509 -days 365 -out cert.pem
    
    OpenSSL> rsa -in keytemp.pem -out key.pem

After that, we will move **key.pem** and **cert.pem** files to our project. They will be in the **config folder**.

Then we will edit the **server.ts** file to enable https.

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
