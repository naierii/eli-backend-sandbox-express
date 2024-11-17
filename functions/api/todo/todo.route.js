"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("./todo.controller");
const login_controller_1 = require("../login/login.controller");
const router = express_1.default.Router();
router.post('/', login_controller_1.authenticateToken, todo_controller_1.createTodo);
router.patch('/:id', login_controller_1.authenticateToken, todo_controller_1.updateTodo);
router.get('/', login_controller_1.authenticateToken, todo_controller_1.getTodos);
router.get('/:id', login_controller_1.authenticateToken, todo_controller_1.getTodo);
router.delete('/:id', login_controller_1.authenticateToken, todo_controller_1.deleteTodo);
module.exports = router;
//# sourceMappingURL=todo.route.js.map