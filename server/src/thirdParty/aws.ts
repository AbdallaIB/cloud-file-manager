import * as AWS from 'aws-sdk';
const moduleName = '[s3]';
import loggerHandler from '@utils/logger';
const logger = loggerHandler(moduleName);
import * as fs from 'fs';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3({ apiVersion: 'latest' });

const getKey = (url) => {
  const { pathname } = new URL(url);
  return pathname.substring(1);
};

export const getSignedUrl = async (url) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: getKey(url), // filename
    Expires: parseInt(process.env.AWS_SIGNED_EXPIRE_TIME_SEC), // time to expire in seconds
  };
  return s3.getSignedUrl('getObject', params);
};

export const uploadMedia = async (key, mimetype, path) => {
  logger.info('[uploadMedia]', { key, mimetype, path });
  try {
    const imageFile = fs.readFileSync(path);
    // Convert the image data to a Buffer and base64 encode it.
    const encoded = Buffer.from(imageFile);
    // Setting up S3 upload parameters
    let Expires = new Date(
      new Date().setSeconds(new Date().getSeconds() + parseInt(process.env.AWS_SIGNED_EXPIRE_TIME_SEC)),
    );
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key, // File name you want to save as in S3
      Body: encoded,
      Expires, // time to expire in seconds
      ContentType: mimetype,
    };
    // Uploading files to the bucket
    return await s3.upload(params).promise();
  } catch (e) {
    logger.error('[uploadMedia][]', e.message);
    return { success: false, msg: e.message };
  }
};
