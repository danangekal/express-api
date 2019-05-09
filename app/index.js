import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import routes from '../routes';

global.appRoot = path.resolve(__dirname);

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.options('*', cors());

// default route
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to this API.' }));

app.use('/api/v1/books', routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found URL' });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
