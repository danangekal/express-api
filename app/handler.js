import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import redis from 'redis';
import config from 'dotenv';

import routes from './routes';

global.appRoot = path.resolve(__dirname);
config.config();

const app = express();
const client = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });

app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.options('*', cors());

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

// default route
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to this API.' }));

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found URL' });
});

module.exports.handler = serverless(app);
