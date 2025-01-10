"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setupInterceptors();
    }
    static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }
    setupInterceptors() {
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        this.api.interceptors.response.use((response) => response, (error) => {
            var _a;
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        });
    }
}
exports.api = Api.getInstance().api;
//# sourceMappingURL=auth.service.js.map