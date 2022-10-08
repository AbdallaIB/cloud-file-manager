import * as AWS from 'aws-sdk';
const moduleName = '[s3]';
import loggerHandler from '@utils/logger';
const logger = loggerHandler(moduleName);
import * as fs from 'fs';
import { Response } from 'express';
import { statusCodes } from '@utils/constants';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3({ apiVersion: 'latest' });

const getKey = (url: string) => {
  const { pathname } = new URL(url);
  return pathname.substring(1);
};

export const getSignedUrl = async (url: string) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: getKey(url), // filename
    Expires: parseInt(process.env.AWS_SIGNED_EXPIRE_TIME_SEC), // time to expire in seconds
  };
  return s3.getSignedUrl('getObject', params);
};

export const uploadMedia = async (key: string, mimetype: string, path: string, res: Response) => {
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
    return res.status(statusCodes.BAD_REQUEST).json({
      message: 'File not found. Please try again.',
    });
  }
};

export const uploadFolder = async (key: string, res: Response) => {
  logger.info('[uploadFolder]', key);
  try {
    let Expires = new Date(
      new Date().setSeconds(new Date().getSeconds() + parseInt(process.env.AWS_SIGNED_EXPIRE_TIME_SEC)),
    );
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key, // File name you want to save as in S3
      Expires, // time to expire in seconds
    };
    // Uploading files to the bucket
    return await s3.putObject(params).promise();
  } catch (e) {
    logger.error('[uploadFolder][]', e.message);
    return res.status(statusCodes.BAD_REQUEST).json({
      message: 'File not found. Please try again.',
    });
  }
};

export const deleteFolder = async (userId: string, key: string, res: Response) => {
  return new Promise((resolve, reject) => {
    // get all keys and delete objects
    const getAndDelete = (ct: string = null) => {
      s3.listObjectsV2({
        Bucket: key,
        MaxKeys: 1000,
        ContinuationToken: ct,
        Prefix: userId + '/',
        Delimiter: '',
      })
        .promise()
        .then(async (data) => {
          // params for delete operation
          let params = {
            Bucket: key,
            Delete: { Objects: [] },
          };
          // add keys to Delete Object
          data.Contents.forEach((content) => {
            params.Delete.Objects.push({ Key: content.Key });
          });
          // delete all keys
          await s3.deleteObjects(params).promise();
          // check if ct is present
          if (data.NextContinuationToken) getAndDelete(data.NextContinuationToken);
          else resolve(true);
        })
        .catch((err) => reject(err));
    };

    // init call
    getAndDelete();
  });
};
