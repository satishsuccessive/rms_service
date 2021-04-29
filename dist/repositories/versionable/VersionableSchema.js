"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class VersionableSchema extends mongoose.Schema {
    constructor(options, collections) {
        const versionedOptions = Object.assign({
            createdAt: {
                default: Date.now,
                type: Date,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            originalId: {
                required: true,
                type: String,
            }
        }, options);
        super(versionedOptions, collections);
    }
}
exports.default = VersionableSchema;
//# sourceMappingURL=VersionableSchema.js.map