"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.setToken = exports.getToken = void 0;
const getToken = () => {
    return localStorage.getItem('token');
};
exports.getToken = getToken;
const setToken = (token) => {
    localStorage.setItem('token', token);
};
exports.setToken = setToken;
const removeToken = () => {
    localStorage.removeItem('token');
};
exports.removeToken = removeToken;
//# sourceMappingURL=token.service.js.map