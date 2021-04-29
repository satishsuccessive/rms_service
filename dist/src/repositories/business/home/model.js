"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const schema_1 = require("./schema");
/**
 * Home Schema
 */
/**
 * @swagger
 * definitions:
 *   HomePost:
 *     properties:
 *       name:
 *         type: string
 *   HomePut:
 *     properties:
 *       name:
 *         type: string
 *       id:
 *         type: string
 *   HomeResponse:
 *     properties:
 *       name:
 *         type: string
 *       id:
 *         type: string
 *       originalId:
 *         type: string
 *       createdAt:
 *         type: string
 *   HomeArraySuccess:
 *     properties:
 *       message:
 *         type: string
 *         example: Success
 *       status:
 *         type: integer
 *         example: 200
 *       data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/HomeResponse'
 *   HomeObjectSuccess:
 *     properties:
 *       message:
 *         type: string
 *         example: Success
 *       status:
 *         type: string
 *         example: 200
 *       data:
 *         type: object
 *         $ref: '#/definitions/HomeResponse'
 *   DeleteSuccess:
 *     properties:
 *       message:
 *         type: string
 *         example: Deleted
 *       status:
 *         type: string
 *         example: 200
 *       data:
 *         type: object
 *         $ref: '#/definitions/Delete'
 *   Delete:
 *     properties:
 *       n:
 *         type: string
 *         example: 1
 *       nModified:
 *         type: string
 *         example: 1
 *       ok:
 *         type: string
 *         example: 1
 */
exports.homeSchema = new schema_1.default({
    collection: 'Homes',
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
        virtuals: true,
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
        virtuals: true,
    },
});
/**
 * Add your
 * - pre-save hook
 * - validation
 * - virtual
 */
exports.homeSchema.pre('save', (next) => {
    // this.updateDate = new Date();
    next();
});
/**
 * Indicies
 */
exports.homeSchema.index({ name: 1 }, { unique: true });
/**
 * Methods
 */
exports.homeSchema.method({});
/**
 * Statics
 */
exports.homeSchema.statics = {};
/**
 * @typedef Home
 */
exports.homeModel = mongoose.model('Home', exports.homeSchema, 'Homes', true);
//# sourceMappingURL=model.js.map