import { Pool } from 'pg';
import process = require('process');

const pool = new Pool({
  user: process.env.POSTGRESS_USER,
  password: process.env.POSTGRESS_PASSWORD,
  host: process.env.POSTGRESS_HOST,
  port: Number(process.env.POSTGRESS_PORT),
  database: process.env.POSTGRESS_DB,
  ssl: process.env.POSTGRESS_SSL_MODE === 'true',
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
