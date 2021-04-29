"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dan_response_handler_1 = require("@gdo-node-experts/dan-response-handler");
const services_1 = require("../../services");
class HomeController {
    static getInstance() {
        if (!HomeController.instance) {
            HomeController.instance = new HomeController();
        }
        return HomeController.instance;
    }
    /* tslint:disable: no-null-keyword */
    constructor() {
        this._homeService = new services_1.HomeService();
    }
    /**
     * Get home list.
     * @property {number} skip - Number of messages to be skipped.
     * @property {number} limit - Limit number of messages to be returned.
     * @returns {IHome[]}
     */
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, skip } = req.query;
                const result = yield HomeController.getInstance()._homeService.list(limit, skip);
                if (!result.length) {
                    return next(dan_response_handler_1.SystemResponse.badRequestError('Data not found'));
                }
                return res.send(dan_response_handler_1.SystemResponse.success('List of homes', result));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Get home.
     * @property {string} id - Number of messages to be skipped.
     * @returns {IHome}
     */
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield HomeController.getInstance()._homeService.get({ id });
                if (!result) {
                    return next(dan_response_handler_1.SystemResponse.badRequestError('Data not found'));
                }
                return res.send(dan_response_handler_1.SystemResponse.success('Home', result));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Create new home
     * @property {string} name - The name of hello world.
     * @returns {IHome}
     */
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const result = yield HomeController.getInstance()._homeService.create({
                    name,
                });
                if (!result) {
                    return next(dan_response_handler_1.SystemResponse.badRequestError('Unable to create'));
                }
                return res.send(dan_response_handler_1.SystemResponse.success('Home created', result));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Update the home
     * @param id {string} - The id of the home.
     * @param name {string} -The updated name
     * @returns {IHome}
     */
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name } = req.body;
                const result = yield HomeController.getInstance()._homeService.update({
                    name,
                    originalId: id,
                });
                if (!result) {
                    return next(dan_response_handler_1.SystemResponse.badRequestError('Unable to update'));
                }
                return res.send(dan_response_handler_1.SystemResponse.success('Home updated', result));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Delete the home
     * @param id {string} The id of the home
     */
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield HomeController.getInstance()._homeService.delete({
                    id,
                });
                if (!result) {
                    return next(dan_response_handler_1.SystemResponse.badRequestError('Unable to delete'));
                }
                return res.send(dan_response_handler_1.SystemResponse.success('Home deleted', result));
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = HomeController.getInstance();
//# sourceMappingURL=HomeController.js.map