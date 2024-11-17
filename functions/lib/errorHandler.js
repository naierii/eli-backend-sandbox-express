"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidAuthTokenErrorRes = exports.noAuthTokenErrorRes = exports.errorCatcher = void 0;
const errorCatcher = (res, error, extraInfo) => {
    console.error('Caught error:', error);
    return res.status(500).json(Object.assign({ error: error.toString() }, extraInfo));
};
exports.errorCatcher = errorCatcher;
const noAuthTokenErrorRes = (res, tokenValue) => {
    console.error('No auth token:', tokenValue);
    return res.status(401).json({
        message: 'No auth token',
        tokenValue,
    });
};
exports.noAuthTokenErrorRes = noAuthTokenErrorRes;
const invalidAuthTokenErrorRes = (res, error) => {
    console.error('Invalid auth token:', error);
    return res.status(403).json({
        message: 'Invalid auth token',
        error,
    });
};
exports.invalidAuthTokenErrorRes = invalidAuthTokenErrorRes;
//# sourceMappingURL=errorHandler.js.map