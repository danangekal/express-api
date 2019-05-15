import express from 'express';
import serverless from 'serverless-http';
// import redis from 'redis';
import config from 'dotenv';

import routes from './routes';

config.config();

const app = express();
// const env = process.env.NODE_ENV || 'development';
// let client = '';

// if (env === 'development') {
//   client = redis.createClient();
// } else {
//   client = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });
// }

// client.on('connect', () => { console.log('Redis client connected'); });
// client.on('error', (err) => { console.log(`Something went wrong ${err}`); });

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to this API.' }));
app.use('/api/v1', routes);
app.use((req, res) => res.status(404).send({ message: 'Not Found URL' }));

module.exports.handler = serverless(app);
