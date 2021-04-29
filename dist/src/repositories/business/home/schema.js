"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VersionableSchema_1 = require("../../versionable/VersionableSchema");
class HomeSchema extends VersionableSchema_1.default {
    constructor(options) {
        const baseSchema = {
            name: {
                required: true,
                type: String,
            },
        };
        super(baseSchema, options);
    }
}
exports.default = HomeSchema;
//# sourceMappingURL=schema.js.map