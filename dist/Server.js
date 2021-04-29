"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("@gdo-tvstack/dan-logger");
const bodyParser = require("body-parser");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const methodOverride = require("method-override");
const morganBody = require("morgan-body");
const dan_prom_node_1 = require("@gdo-global-client-reporting/dan-prom-node");
const dan_auth_middleware_1 = require("@gdo-tvstack/dan-auth-middleware");
const constants_1 = require("./libs/constants");
const Database_1 = require("./libs/Database");
const routes_1 = require("./libs/routes");
const Swagger_1 = require("./libs/Swagger");
const router_1 = require("./router");
const dan_response_handler_1 = require("@gdo-node-experts/dan-response-handler");
class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }
    get application() {
        return this.app;
    }
    /**
     * To enable all the setting on our express app
     * @returns -Instance of Current Object
     */
    bootstrap() {
        const { authProvider } = this.config;
        this.initHelmet();
        this.initCompress();
        this.initCookieParser();
        this.initCors();
        this.initAuth(authProvider);
        this.initJsonParser();
        this.initMethodOverride();
        this.initLogger();
        this.initSwagger();
        dan_prom_node_1.Prometheus.setupProm(this.app);
        this.setupRoutes();
        return this.app;
    }
    /**
     * This will Setup all the routes in the system
     *
     * @returns -Instance of Current Object
     * @memberof Server
     */
    setupRoutes() {
        const { env, apiPrefix } = this.config;
        const stack = (env === constants_1.EnvVars.DEV || env === constants_1.EnvVars.TEST);
        // mount all routes on /api path
        this.app.use(apiPrefix, router_1.default);
        // catch 404 and forward to error handler
        this.app.use(routes_1.notFoundRoute);
        // error handler, send stacktrace only during development
        this.app.use(dan_response_handler_1.errorHandler(stack));
    }
    /**
     * This will run the server at specified port after opening up of Database
     *
     * @returns -Instance of Current Object
     */
    run() {
        // open Database & listen on port config.port
        const { port, env, mongo } = this.config;
        Database_1.default.open({ mongoUri: mongo, testEnv: false }).then(() => {
            this.app.listen(port, () => {
                const message = `|| App is running at port '${port}' in '${env}' mode ||`;
                logger.info(message.replace(/[^]/g, '-'));
                logger.info(message);
                logger.info(message.replace(/[^]/g, '-'));
                logger.info('Press CTRL-C to stop\n');
            });
        });
        return this;
    }
    /**
     *
     *
     * @returns Promise
     *
     */
    testDBConnect() {
        const { mongo } = this.config;
        return Database_1.default.open({ mongoUri: mongo, testEnv: true });
    }
    /**
     * Close the connected Database
     *
     * @returns Promise
     * @memberof Server
     */
    closeDB() {
        return Database_1.default.close();
    }
    /**
     * Compression of the output
     */
    initCompress() {
        this.app.use(compress());
    }
    /**
     * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
     */
    initCookieParser() {
        this.app.use(cookieParser());
    }
    /**
     *
     * Lets you to enable cors
     */
    initCors() {
        this.app.use(cors({
            optionsSuccessStatus: 200,
            origin: JSON.parse(this.config.corsOrigin),
        }));
    }
    /**
     *
     * Helmet helps you secure your Express apps by setting various HTTP headers.
     */
    initHelmet() {
        this.app.use(helmet());
    }
    /**
     *  - Parses urlencoded bodies & JSON
     */
    initJsonParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    /**
     * Enabling Logger for Development Environment
     */
    initLogger() {
        morganBody(this.app);
    }
    /**
     *
     * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
     */
    initMethodOverride() {
        this.app.use(methodOverride());
    }
    /**
     * Initialize auth manager
     */
    initAuth(authProvider) {
        const authManager = dan_auth_middleware_1.AuthManager.getInstance();
        authManager.init(authProvider);
    }
    /**
     * Initialize Swagger
     */
    initSwagger() {
        const { swaggerDefinition, swaggerUrl } = this.config;
        const swaggerSetup = new Swagger_1.default();
        // JSON route
        this.app.use(`${swaggerUrl}.json`, swaggerSetup.getRouter({
            swaggerDefinition,
        }));
        // UI route
        const { serve, setup } = swaggerSetup.getUI(swaggerUrl);
        this.app.use(swaggerUrl, serve, setup);
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map