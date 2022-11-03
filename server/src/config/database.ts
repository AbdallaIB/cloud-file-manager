import { config } from '@config/config';
import { Pool } from 'pg';
import process = require('process');
const moduleName = '[database] ';
import loggerHandler from '@utils/logger';
const logger = loggerHandler(moduleName);

const pool = new Pool({
  user: config.pg_config.user,
  password: config.pg_config.password,
  host: config.pg_config.host,
  port: config.pg_config.port,
  database: config.pg_config.database,
  ssl: config.pg_config.ssl,
  max: config.pg_config.max,
  idleTimeoutMillis: config.pg_config.idleTimeoutMillis,
});

export const connectToDatabase = function () {
  pool.connect((err) => {
    if (err) throw err;
    else {
      logger.info('Connected to database');
      pool.on('error', (err) => {
        logger.error('[connectToDatabase][err] Unexpected error', err);
        process.exit(-1);
      });
    }
  });
};

export default pool;
