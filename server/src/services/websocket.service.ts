// src/services/websocket.service.ts
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export class WebSocketService {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
      }
    });

    this.io.use(this.authenticateSocket);
    this.setupEventHandlers();
  }

  private authenticateSocket = async (socket: any, next: Function) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        throw new Error('Authentication required');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  };

  private setupEventHandlers() {
    this.io.on('connection', (socket: any) => {
      console.log(`User connected: ${socket.user.id}`);

      // Join user to their project rooms
      socket.on('join-project', (projectId: string) => {
        socket.join(`project:${projectId}`);
      });

      // Handle task updates
      socket.on('task-update', (data: any) => {
        this.io.to(`project:${data.projectId}`).emit('task-updated', data);
      });

      // Handle new comments
      socket.on('new-comment', (data: any) => {
        this.io.to(`project:${data.projectId}`).emit('comment-added', data);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.id}`);
      });
    });
  }

  // Methods to emit events
  public emitTaskUpdate(projectId: string, taskData: any) {
    this.io.to(`project:${projectId}`).emit('task-updated', taskData);
  }

  public emitNewComment(projectId: string, commentData: any) {
    this.io.to(`project:${projectId}`).emit('comment-added', commentData);
  }

  public emitProjectUpdate(projectId: string, projectData: any) {
    this.io.to(`project:${projectId}`).emit('project-updated', projectData);
  }
}