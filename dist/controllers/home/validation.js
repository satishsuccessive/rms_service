"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../libs/utilities");
exports.default = Object.freeze({
    // POST /api/homes/create
    create: {
        name: {
            errorMessage: 'Name is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'Name should be at least 2 chars long',
                // Multiple options would be expressed as an array
                options: { min: 2 },
            },
        },
    },
    delete: {
        id: {
            custom: {
                options: (id) => {
                    return utilities_1.isValidObjectId(id);
                },
            },
            errorMessage: 'Bad ID format',
            in: ['params'],
        },
    },
    // GET /api/homes/:id
    get: {
        id: {
            custom: {
                options: (id) => {
                    return utilities_1.isValidObjectId(id);
                },
            },
            errorMessage: 'Bad ID format',
            in: ['params'],
        },
    },
    // GET /api/homes
    list: {
        limit: {
            errorMessage: 'limit is wrong',
            in: ['query'],
            isInt: true,
            optional: true,
            toInt: true,
        },
        skip: {
            errorMessage: 'skip count is wrong',
            in: ['query'],
            isInt: true,
            optional: true,
            toInt: true,
        },
    },
    update: {
        id: {
            custom: {
                options: (id) => {
                    return utilities_1.isValidObjectId(id);
                },
            },
            errorMessage: 'Bad ID format',
            in: ['body'],
        },
        name: {
            errorMessage: 'Name is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'Name should be at least 2 chars long',
                // Multiple options would be expressed as an array
                options: { min: 2 },
            },
        },
    },
});
//# sourceMappingURL=validation.js.map