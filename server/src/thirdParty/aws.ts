import { S3, config as AwsConfig } from 'aws-sdk';
const moduleName = '[s3]';
import loggerHandler from '@utils/logger';
const logger = loggerHandler(moduleName);
import * as fs from 'fs';
import { Response } from 'express';
import { statusCodes } from '@utils/constants';
import { config } from '@config/config';

AwsConfig.update({
  region: config.aws_config.region,
  accessKeyId: config.aws_config.accessKey,
  secretAccessKey: config.aws_config.secretAccessKey,
});
const s3 = new S3({ apiVersion: 'latest' });

const getKey = (url: string) => {
  const { pathname } = new URL(url);
  return pathname.substring(1);
};

export const getSignedUrl = (url: string) => {
  const params = {
    Bucket: config.aws_config.bucketName,
    Key: getKey(url), // filename
    Expires: parseInt(config.aws_config.signedExpireTimeSec), // time to expire in seconds
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
      new Date().setSeconds(new Date().getSeconds() + parseInt(config.aws_config.signedExpireTimeSec)),
    );
    const params = {
      Bucket: config.aws_config.bucketName,
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

export const deleteMedia = async (key: string, res: Response) => {
  logger.info('[deleteMedia]', key);
  try {
    const params = {
      Bucket: config.aws_config.bucketName,
      Key: key, // File name you want to save as in S3
    };

    // Check if file exists in bucket
    await s3.headObject(params).promise();

    // Uploading files to the bucket
    return await s3.deleteObject(params).promise();
  } catch (e) {
    logger.error('[deleteMedia][]', e.message);
    return res.status(statusCodes.BAD_REQUEST).json({
      message: 'File not found. Please try again.',
    });
  }
};
