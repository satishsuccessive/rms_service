"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dan_response_handler_1 = require("@gdo-node-experts/dan-response-handler");
exports.default = (req, res, next) => {
    return next(dan_response_handler_1.SystemResponse.notFoundError());
};
//# sourceMappingURL=notFoundRoute.js.map