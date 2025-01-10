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
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const security_middleware_1 = require("./middleware/security.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const logging_service_1 = require("./services/logging.service");
const logging_service_2 = require("./services/logging.service");
const env_config_1 = __importDefault(require("./config/env.config"));
const app = (0, express_1.default)();
exports.app = app;
app.use(security_middleware_1.securityMiddleware.helmet);
app.use(security_middleware_1.securityMiddleware.cors);
app.use('/api/', security_middleware_1.securityMiddleware.rateLimiter);
app.use(security_middleware_1.securityMiddleware.sanitizeRequest);
app.use(logging_service_1.requestLogger);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/integrations', require('./routes/integration.routes'));
app.use(error_middleware_1.errorHandler);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { port } = env_config_1.default.server;
        app.listen(port, () => {
            logging_service_2.logger.info(`Server running on port ${port} in ${env_config_1.default.server.nodeEnv} mode`);
        });
    }
    catch (error) {
        logging_service_2.logger.error('Failed to start server:', error);
        process.exit(1);
    }
});
exports.startServer = startServer;
//# sourceMappingURL=app.js.map