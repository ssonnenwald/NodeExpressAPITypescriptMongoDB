"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./routes/crmRoutes");
const mongoose = require("mongoose");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/CRMdb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerDocument));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map