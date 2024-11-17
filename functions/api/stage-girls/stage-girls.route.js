"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stage_girls_controller_1 = __importDefault(require("./stage-girls.controller"));
const router = express_1.default.Router();
router.get('/', stage_girls_controller_1.default);
router.get('/:firstName', stage_girls_controller_1.default);
module.exports = router;
//# sourceMappingURL=stage-girls.route.js.map