import redis from 'redis';
import config from 'dotenv';

config.config();

const client = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });

const setEx = (key, expiredTime, value) => {
  return client.setex(key, expiredTime, value);
};

const get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result) {
        resolve(result);
      } else {
        resolve(null);
      }
    });
  });
};

export default {
  setEx,
  get
};
