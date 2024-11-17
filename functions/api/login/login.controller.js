"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.authenticateToken = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../../lib/errorHandler");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const user = { name: username };
        const accessToken = (0, exports.generateAccessToken)(user);
        const refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        return (0, errorHandler_1.errorCatcher)(res, error);
    }
});
exports.login = login;
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && `${authHeader.split(' ')[1]}`;
        if (!token) {
            return (0, errorHandler_1.noAuthTokenErrorRes)(res, token);
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return (0, errorHandler_1.invalidAuthTokenErrorRes)(res, err);
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        return (0, errorHandler_1.errorCatcher)(res, error);
    }
});
exports.authenticateToken = authenticateToken;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s',
    });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=login.controller.js.map