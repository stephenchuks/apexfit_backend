// src/config/redis.ts
import { createClient, RedisClientType } from 'redis';
import debugFactory from 'debug';

const debug = debugFactory('apexfit:redis');

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  debug('⚠️  No REDIS_URL set—caching disabled');
}

export let redisClient: RedisClientType | null = null;
export let redisReady = false;

if (REDIS_URL) {
  const client: RedisClientType = createClient({ url: REDIS_URL });
  redisClient = client;

  client.on('error', (err) => {
    debug('Redis Client Error (caching disabled):', err);
  });

  client
    .connect()
    .then(() => {
      redisReady = true;
      debug('✅ Redis connected');
    })
    .catch((err) => {
      debug('⚠️  Redis connection failed—caching disabled:', err);
    });
}
