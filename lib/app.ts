import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/crmRoutes';
import * as mongoose from 'mongoose';
import * as swaggerui from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

/**
 *
 * @description App
 * @author Scott R. Sonnenwald
 */
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();  
    public mongoUrl: string = 'mongodb://localhost:27017/CRMdb';

    /**
     * Creates an instance of app.
     * @author Scott R. Sonnenwald
     */
    constructor() {
        this.app = express();
        this.config();   
        this.routePrv.routes(this.app);     
        this.mongoSetup();
    }
    
    /**
     *
     * @description Configures the application.
     * @author Scott R. Sonnenwald
     */
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
        // Serving static files 
        this.app.use(express.static('public'));

        this.app.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerDocument)); 
    }
    
    /**
     *
     * @description Setup Mongo database connection.
     * @author Scott R. Sonnenwald
     */
    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });        
    }
}

export default new App().app;