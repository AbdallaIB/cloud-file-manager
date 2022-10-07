import * as path from 'path';
import * as pg from 'pg';
import process = require('process');
const Pool = pg.Pool;
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve('.env') });

const pool = new Pool({
  user: process.env.POSTGRESS_USER,
  password: process.env.POSTGRESS_PASSWORD,
  host: process.env.POSTGRESS_HOST,
  port: parseInt(process.env.POSTGRESS_PORT),
  database: process.env.POSTGRESS_DB,
});

export const connectToDatabase = function () {
  pool.connect((err) => {
    if (err) throw err;
    else {
      console.log('Connected to database');
      pool.on('error', (err) => {
        console.error('Unexpected error', err);
        process.exit(-1);
      });
    }
  });
};

export default pool;
