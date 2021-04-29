"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const constants = require("../libs/constants");
const auth_1 = require("./auth");
const envVars = process.env;
/* tslint:disable:no-var-requires */
const version = require('../../package.json').version;
const isMongooseDebug = (envVars.NODE_ENV === constants.EnvVars.DEV)
    ? true : false;
const configurations = Object.freeze({
    apiPrefix: constants.API_PREFIX,
    authProvider: auth_1.authProvider,
    corsOrigin: envVars.CORS_ORIGIN || `["http://localhost"]`,
    env: envVars.NODE_ENV,
    mongo: envVars.NODE_ENV === constants.EnvVars.TEST ? envVars.MONGO_TEST_URL : envVars.MONGO_URL,
    mongooseDebug: isMongooseDebug,
    port: envVars.PORT,
    swaggerDefinition: {
        basePath: constants.API_PREFIX,
        info: Object.assign({}, constants.ABOUT, { version }),
        securityDefinitions: {
            Bearer: {
                in: constants.ABOUT.in,
                name: constants.ABOUT.name,
                type: constants.ABOUT.type,
            },
        },
    },
    swaggerUrl: constants.SWAGGER_URL,
});
exports.default = configurations;
//# sourceMappingURL=configuration.js.map