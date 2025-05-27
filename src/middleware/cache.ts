// src/middleware/cache.ts
import { Request, Response, NextFunction } from 'express';
import { redisClient, redisReady } from '../config/redis.js';

export function cache(keyPrefix: string, ttlSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Skip caching if Redis is not configured or not connected
    if (!redisClient || !redisReady) {
      return next();
    }

    const { page = '1', limit = '20' } = req.query;
    const cacheKey = `${keyPrefix}:page=${page}:limit=${limit}`;

    try {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        res.setHeader('X-Cache', 'HIT');
        res.status(200).json(JSON.parse(cached));
        return; // explicit void return after sending
      }

      // on cache miss, store key & ttl for controller to save later
      res.locals.cacheKey = cacheKey;
      res.locals.ttl      = ttlSeconds;
      res.setHeader('X-Cache', 'MISS');
    } catch (err) {
      console.error('Cache middleware error:', err);
    }

    next();
  };
}
