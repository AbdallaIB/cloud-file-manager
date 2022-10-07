import loggerHandler from '@utils/logger';
const moduleName = '[file] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { getSignedUrl, uploadMedia } from '@thirdParty/aws';
import * as path from 'path';
import { statusCodes } from '@utils/constants';
import { filesize } from 'filesize';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { getMediaType } from '@utils/utils';
import { RequestWithUser } from '@middlewares/auth';

export class FileController {
  public async saveFile(req: RequestWithUser, res: Response) {
    logger.info('[saveFile][body]', req.body);
    const { id } = req.user;
    const { file, body } = req;
    const { name } = body;
    const { mimetype, size, filename } = file;
    const filePath = path.resolve(__dirname, `../../uploads/${filename}`);

    const extension = path.extname(filename).toLowerCase();
    const mediaType = getMediaType(extension);

    try {
      const upload = (await uploadMedia(id + '/' + filename, mimetype, filePath, res)) as ManagedUpload.SendData;
      const query = `INSERT INTO files (name, size, extension, type, url, owner_id) VALUES ($1, $2, $3, $4, $5, $6)`;
      const params = [name, filesize(size), extension, mediaType, upload.Location, '1'];
      await db.query(query, params);
      res.status(statusCodes.OK).json({ message: 'File uploaded successfully!' });
    } catch (error) {
      logger.error('[saveFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  public async getFile(req: Request, res: Response) {
    logger.info('[getFile][params]', req.params);
    const { id } = req.params;
    const query = `SELECT * FROM files WHERE id = $1`;
    const params = [id];
    try {
      const result = await db.query(query, params);
      result.rows[0].url = await getSignedUrl(result.rows[0].url);
      res.status(statusCodes.OK).json({ message: 'File found!', result: result.rows[0] });
    } catch (error) {
      logger.error('[getFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  public async deleteFile(req: Request, res: Response) {
    logger.info('[deleteFile][params]', req.params);
    const { id } = req.params;
    const query = `DELETE FROM files WHERE id = $1`;
    const params = [id];
    try {
      await db.query(query, params);
      res.status(statusCodes.OK).json({ message: 'File was deleted!' });
    } catch (error) {
      logger.error('[deleteFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
