import config from 'dotenv';

config.config();

const db = {
  development: {
    username: 'root',
    password: 'root',
    database: 'expressdb',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    timezone: 'Asia/Jakarta',
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: 'mysql',
    logging: false,
    timezone: 'Asia/Jakarta',
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: 'Amazon RDS'
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: 'Asia/Jakarta',
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: 'Amazon RDS'
    }
  }
};

export default db;
