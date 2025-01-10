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
exports.cacheService = exports.cacheMiddleware = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_config_1 = __importDefault(require("../config/env.config"));
const logging_service_1 = require("./logging.service");
class CacheService {
    constructor() {
        this.defaultTTL = 3600;
        this.client = new ioredis_1.default(env_config_1.default.redis.url, {
            retryStrategy: (times) => {
                if (times > 3) {
                    logging_service_1.logger.error('Redis connection failed');
                    return null;
                }
                return Math.min(times * 100, 3000);
            }
        });
        this.setupEventHandlers();
    }
    setupEventHandlers() {
        this.client.on('connect', () => {
            logging_service_1.logger.info('Redis connected');
        });
        this.client.on('error', (error) => {
            logging_service_1.logger.error('Redis error:', error);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield this.client.get(key);
                return value ? JSON.parse(value) : null;
            }
            catch (error) {
                logging_service_1.logger.error('Cache get error:', error);
                return null;
            }
        });
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serializedValue = JSON.stringify(value);
                if (ttl) {
                    yield this.client.setex(key, ttl, serializedValue);
                }
                else {
                    yield this.client.setex(key, this.defaultTTL, serializedValue);
                }
            }
            catch (error) {
                logging_service_1.logger.error('Cache set error:', error);
            }
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.del(key);
            }
            catch (error) {
                logging_service_1.logger.error('Cache delete error:', error);
            }
        });
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.flushall();
            }
            catch (error) {
                logging_service_1.logger.error('Cache flush error:', error);
            }
        });
    }
}
const cacheMiddleware = (ttl) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.method !== 'GET') {
            return next();
        }
        const cacheKey = `${req.originalUrl || req.url}`;
        const cachedResponse = yield exports.cacheService.get(cacheKey);
        if (cachedResponse) {
            return res.json(cachedResponse);
        }
        const originalJson = res.json;
        res.json = function (body) {
            exports.cacheService.set(cacheKey, body, ttl);
            return originalJson.call(this, body);
        };
        next();
    });
};
exports.cacheMiddleware = cacheMiddleware;
exports.cacheService = new CacheService();
//# sourceMappingURL=cache.service.js.map