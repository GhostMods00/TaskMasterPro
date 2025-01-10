"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiService = exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiService {
    constructor() {
        this._client = axios_1.default.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setupInterceptors();
    }
    static getInstance() {
        if (!ApiService._instance) {
            ApiService._instance = new ApiService();
        }
        return ApiService._instance;
    }
    get client() {
        return this._client;
    }
    setupInterceptors() {
        this._client.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));
        this._client.interceptors.response.use((response) => response, (error) => {
            var _a;
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        });
    }
}
exports.ApiService = ApiService;
exports.apiService = ApiService.getInstance();
//# sourceMappingURL=base.service.js.map