"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_test_controller_1 = require("./home-test.controller");
const router = express_1.default.Router();
router.get('/', home_test_controller_1.getHomeTest);
module.exports = router;
//# sourceMappingURL=home-test.route.js.map