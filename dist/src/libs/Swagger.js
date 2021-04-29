"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
class Swagger {
    getRouter({ swaggerDefinition }) {
        const router = express_1.Router();
        router.route('/')
            .get((req, res) => {
            // options for the swagger docs
            const options = {
                // path to the API docs
                apis: ['dist/src/**/*.js'],
                // import swaggerDefinitions
                swaggerDefinition,
            };
            // initialize swagger-jsdoc
            const swaggerSpec = swaggerJSDoc(options);
            res.send(swaggerSpec);
        });
        return router;
    }
    getUI(swaggerUrl) {
        const options = {
            swaggerUrl: `${swaggerUrl}.json`,
        };
        return {
            serve: swaggerUi.serve,
            setup: swaggerUi.setup(undefined, options),
        };
    }
}
exports.default = Swagger;
//# sourceMappingURL=Swagger.js.map