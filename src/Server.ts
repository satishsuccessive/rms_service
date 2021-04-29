import * as logger from '@gdo-tvstack/dan-logger';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morganBody from 'morgan-body';

import { Prometheus } from '@gdo-global-client-reporting/dan-prom-node';
import { AuthManager } from '@gdo-tvstack/dan-auth-middleware';
import { EnvVars } from './libs/constants';
import Database from './libs/Database';
import { notFoundRoute } from './libs/routes';
import Swagger from './libs/Swagger';
import router from './router';

import { errorHandler } from '@gdo-node-experts/dan-response-handler';
export default class Server {
  private app: express.Express;

  constructor(private config: any) {
    this.app = express();
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  public bootstrap() {
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
    Prometheus.setupProm(this.app);

    this.setupRoutes();

    return this.app;
  }

  /**
   * This will Setup all the routes in the system
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  public setupRoutes() {
    const { env, apiPrefix } = this.config;
    const stack = (env === EnvVars.DEV || env === EnvVars.TEST);
    // mount all routes on /api path
    this.app.use(apiPrefix, router);

    // catch 404 and forward to error handler
    this.app.use(notFoundRoute);

    // error handler, send stacktrace only during development
    this.app.use(errorHandler(stack));
  }
  /**
   * This will run the server at specified port after opening up of Database
   *
   * @returns -Instance of Current Object
   */
  public run() {
    // open Database & listen on port config.port
    const { port, env, mongo } = this.config;
    Database.open({ mongoUri: mongo, testEnv: false }).then(() => {
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
  public testDBConnect() {
    const { mongo } = this.config;
    return Database.open({ mongoUri: mongo, testEnv: true });
  }

  /**
   * Close the connected Database
   *
   * @returns Promise
   * @memberof Server
   */
  public closeDB() {
    return Database.close();
  }
  /**
   * Compression of the output
   */
  private initCompress() {
    this.app.use(compress());
  }

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  private initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  private initCors() {
    this.app.use(cors({
      optionsSuccessStatus: 200,
      origin: JSON.parse(this.config.corsOrigin),
      // credentials: true,
    }));
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  private initHelmet() {
    this.app.use(helmet());
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  private initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   * Enabling Logger for Development Environment
   */
  private initLogger() {
    morganBody(this.app);
  }

  /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  private initMethodOverride() {
    this.app.use(methodOverride());
  }

  /**
   * Initialize auth manager
   */
  private initAuth(authProvider) {
    const authManager: AuthManager = AuthManager.getInstance();
    authManager.init(authProvider);
  }

  /**
   * Initialize Swagger
   */
  private initSwagger() {
    const { swaggerDefinition, swaggerUrl } = this.config;

    const swaggerSetup = new Swagger();

    // JSON route
    this.app.use(`${swaggerUrl}.json`, swaggerSetup.getRouter({
      swaggerDefinition,
    }));

    // UI route
    const { serve, setup } = swaggerSetup.getUI(swaggerUrl);

    this.app.use(swaggerUrl, serve, setup);
  }
}
