"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.generateObjectId = () => mongoose.Types.ObjectId();
exports.isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
//# sourceMappingURL=utilities.js.map