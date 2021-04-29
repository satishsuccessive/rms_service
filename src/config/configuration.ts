import { config } from 'dotenv';
config();
import * as constants from '../libs/constants';
import { authProvider } from './auth';
import { IConfig } from './IConfig';

const envVars: NodeJS.ProcessEnv = process.env;
/* tslint:disable:no-var-requires */
const version = require('../../package.json').version;
const isMongooseDebug = (envVars.NODE_ENV === constants.EnvVars.DEV)
  ? true : false;
const configurations = Object.freeze({
  apiPrefix: constants.API_PREFIX,
  authProvider,
  corsOrigin: envVars.CORS_ORIGIN || `["http://localhost"]`,
  env: envVars.NODE_ENV,
  mongo: envVars.NODE_ENV === constants.EnvVars.TEST ? envVars.MONGO_TEST_URL : envVars.MONGO_URL,
  mongooseDebug: isMongooseDebug,
  port: envVars.PORT,
  swaggerDefinition: {
    basePath: constants.API_PREFIX,
    info: {
      ...constants.ABOUT,
      version,
    },
    securityDefinitions: {
      Bearer: {
        in: constants.ABOUT.in,
        name: constants.ABOUT.name,
        type: constants.ABOUT.type,
      },
    },
  },
  swaggerUrl: constants.SWAGGER_URL,
}) as IConfig;

export default configurations;
