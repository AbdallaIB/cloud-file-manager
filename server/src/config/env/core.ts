import * as path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);

export const core = {
  root: rootPath,
  node_env: process.env.NODE_ENV,
  pg_config: {
    user: process.env.POSTGRESS_USER,
    password: process.env.POSTGRESS_PASSWORD,
    host: process.env.POSTGRESS_HOST,
    port: Number(process.env.POSTGRESS_PORT),
    database: process.env.POSTGRESS_DB,
    ssl: process.env.POSTGRESS_SSL_MODE === 'true',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
  },
  aws_config: {
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    signedExpireTimeSec: process.env.AWS_SIGNED_EXPIRE_TIME_SEC,
    uploadExpireTimeSec: process.env.AWS_UPLOAD_EXPIRE_TIME_SEC,
  },
  TOKEN_EXPIRE_TIME_SEC: 15000000,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
};
