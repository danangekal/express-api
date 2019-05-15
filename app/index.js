import express from 'express';
import io from 'socket.io';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debugLib from 'debug';
import http from 'http';
import cors from 'cors';
import redis from 'redis';
import config from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerDoc from '../public/swagger.json';

global.appRoot = path.resolve(__dirname);
config.config();

const app = express();
const debug = debugLib('express-api:server');
const env = process.env.NODE_ENV || 'development';
let client = '';

if (env === 'development') {
  client = redis.createClient();
} else {
  client = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });
}

client.on('connect', () => { console.log('Redis client connected'); });
client.on('error', (err) => { console.log(`Something went wrong ${err}`); });

app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.options('*', cors());


// default route
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to this API.' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', routes);
app.use((req, res) => res.status(404).send({ message: 'Not Found URL' }));

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
const socketio = io(server);


/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

socketio.on('connection', (clientSocket) => {
  console.log('a user connected');

  clientSocket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

server.on('error', onError);
server.on('listening', onListening);

export default server;
