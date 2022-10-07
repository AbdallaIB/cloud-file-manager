import loggerHandler from '@utils/logger';
const moduleName = '[file] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { uploadMedia } from '@thirdParty/aws';
import * as path from 'path';
import { statusCodes } from '@utils/constants';
import { filesize } from 'filesize';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { deleteLocalCopy, getMediaType } from '@utils/utils';

export class FileController {
  public async saveFile(req: Request, res: Response) {
    logger.info('[saveFile][body]', req.body);
    const maxFileSize = 10000000;
    const { file, body } = req;
    const { name } = body;

    if (!file) {
      logger.error('[saveFile][File not found]');
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'File not found. Please try again.',
      });
    }

    const { mimetype, size, filename } = file;
    const extension = path.extname(filename).toLowerCase();
    const filePath = path.resolve(__dirname, `../../uploads/${filename}`);
    const mediaType = getMediaType(extension);

    if (size > maxFileSize) {
      // If greater than 10MB
      logger.error('[Image file greater than 10MB]');
      deleteLocalCopy(filePath);
      return res.status(statusCodes.PAYLOAD_TOO_LARGE).json({
        message: 'The selected image is too big. Please choose one that is smaller than 10 MB.',
      });
    }

    const upload = (await uploadMedia(filename, mimetype, filePath, res)) as ManagedUpload.SendData;
    const query = `INSERT INTO files (name, size, extension, type, url, owner_id) VALUES ($1, $2, $3, $4, $5, $6)`;
    const params = [name, filesize(size), extension, mediaType, upload.Location, '1'];
    try {
      await db.query(query, params);
      res.status(statusCodes.OK).json({ message: 'File uploaded successfully!' });
    } catch (error) {
      logger.error('[saveFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  public async getFile(req: Request, res: Response) {
    logger.info('[getFile][body]', req.body);
  }

  public async deleteFile(req: Request, res: Response) {
    logger.info('[deleteFile][body]', req.body);
  }
}
