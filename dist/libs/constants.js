"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_URL = '/api-docs';
exports.API_PREFIX = '/api';
exports.ABOUT = {
    description: 'Kitchen sink API with Swagger',
    in: 'Headers',
    name: 'Authorization',
    title: 'DAN Kitchen sink API',
    type: 'apiKey',
};
// Listing of Environments
var EnvVars;
(function (EnvVars) {
    EnvVars["TEST"] = "test";
    EnvVars["LOCAL"] = "local";
    EnvVars["DEV"] = "dev";
    EnvVars["STG"] = "stg";
    EnvVars["PROD"] = "prod";
})(EnvVars = exports.EnvVars || (exports.EnvVars = {}));
//# sourceMappingURL=constants.js.map