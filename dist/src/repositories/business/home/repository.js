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
const logger = require("@gdo-tvstack/dan-logger");
const VersioningRepository_1 = require("../../versionable/VersioningRepository");
const model_1 = require("./model");
class HomeRepository extends VersioningRepository_1.default {
    constructor() {
        super(model_1.homeModel);
    }
    /**
     * Get home list.
     * @property {number} skip - Number of records to be skipped.
     * @property {number} limit - Limit number of records to be returned.
     * @returns {Home[]}
     */
    list(options) {
        const _super = Object.create(null, {
            getAll: { get: () => super.getAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('Home - List query: ', options);
            return _super.getAll.call(this, {}, options);
        });
    }
    /**
     * Get home.
     * @property {string} id - _id of the record
     * @returns {Home}
     */
    get(query) {
        const _super = Object.create(null, {
            getById: { get: () => super.getById }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('HomeRepository - Get: ');
            return _super.getById.call(this, query.id);
        });
    }
    /**
     * Create new home
     * @property {string} name - The name of record.
     * @returns {Home}
     */
    create(options) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('HomeRepository - Create: ');
            return _super.create.call(this, options);
        });
    }
    /**
     * Update new home
     * @property {string} name - The name of record.
     * @returns {Home}
     */
    update(options) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('HomeRepository - Update: ');
            return _super.update.call(this, options);
        });
    }
    /**
     * Delete home
     * @property {string} body.name - The name of record.
     * @returns {Home}
     */
    delete(query) {
        const _super = Object.create(null, {
            remove: { get: () => super.remove }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('HomeRepository - Delete: ');
            return _super.remove.call(this, query.id);
        });
    }
    /**
     * Hard Delete home
     * @property {string} body.name - The name of record.
     * @returns {Home}
     */
    hardDelete(query) {
        const _super = Object.create(null, {
            hardRemove: { get: () => super.hardRemove }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('HomeRepository - Hard Delete: ');
            return _super.hardRemove.call(this, query);
        });
    }
}
exports.default = HomeRepository;
//# sourceMappingURL=repository.js.map