import app from './app';
import * as https from 'https';
import * as fs from 'fs';

/** 
 * 
 * @description Setup the Port of the node webserver to listen on.
*/
const PORT = 3000;

/** 
 * 
 * @description Setup the HTTPS options for the node webserver.
*/
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
}

/** 
 * 
 * @description Create the node webserver and start listening.
*/
https.createServer(httpsOptions, app).listen(PORT, () => {  
    console.log('Express server listening on port ' + PORT);
})