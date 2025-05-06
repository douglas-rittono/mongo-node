const Redis = require('ioredis');

class CacheRepository{
    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
        });
    }

    async set(key, value, ttl = 3600) {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async get(key) {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async delete(key) {
        await this.redis.del(key);
    }
}

module.exports = new CacheRepository();