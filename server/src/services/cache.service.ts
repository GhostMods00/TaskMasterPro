// server/src/services/cache.service.ts
import Redis from 'ioredis';
import config from '../config/env.config';
import { logger } from './logging.service';

class CacheService {
  private client: Redis;
  private defaultTTL: number = 3600; // 1 hour

  constructor() {
    this.client = new Redis(config.redis.url, {
      retryStrategy: (times) => {
        if (times > 3) {
          logger.error('Redis connection failed');
          return null;
        }
        return Math.min(times * 100, 3000);
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.on('connect', () => {
      logger.info('Redis connected');
    });

    this.client.on('error', (error) => {
      logger.error('Redis error:', error);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setex(key, ttl, serializedValue);
      } else {
        await this.client.setex(key, this.defaultTTL, serializedValue);
      }
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Cache delete error:', error);
    }
  }

  async flush(): Promise<void> {
    try {
      await this.client.flushall();
    } catch (error) {
      logger.error('Cache flush error:', error);
    }
  }
}

// Cache middleware
export const cacheMiddleware = (ttl?: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = `${req.originalUrl || req.url}`;
    const cachedResponse = await cacheService.get(cacheKey);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const originalJson = res.json;
    res.json = function(body) {
      cacheService.set(cacheKey, body, ttl);
      return originalJson.call(this, body);
    };

    next();
  };
};

export const cacheService = new CacheService();