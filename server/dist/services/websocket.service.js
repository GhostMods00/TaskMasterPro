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
exports.WebSocketService = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class WebSocketService {
    constructor(server) {
        this.authenticateSocket = (socket, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = socket.handshake.auth.token;
                if (!token) {
                    throw new Error('Authentication required');
                }
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                socket.user = decoded;
                next();
            }
            catch (error) {
                next(new Error('Authentication failed'));
            }
        });
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ['GET', 'POST']
            }
        });
        this.io.use(this.authenticateSocket);
        this.setupEventHandlers();
    }
    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.user.id}`);
            socket.on('join-project', (projectId) => {
                socket.join(`project:${projectId}`);
            });
            socket.on('task-update', (data) => {
                this.io.to(`project:${data.projectId}`).emit('task-updated', data);
            });
            socket.on('new-comment', (data) => {
                this.io.to(`project:${data.projectId}`).emit('comment-added', data);
            });
            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.user.id}`);
            });
        });
    }
    emitTaskUpdate(projectId, taskData) {
        this.io.to(`project:${projectId}`).emit('task-updated', taskData);
    }
    emitNewComment(projectId, commentData) {
        this.io.to(`project:${projectId}`).emit('comment-added', commentData);
    }
    emitProjectUpdate(projectId, projectData) {
        this.io.to(`project:${projectId}`).emit('project-updated', projectData);
    }
}
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map