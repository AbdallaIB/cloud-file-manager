import loggerHandler from '@utils/logger';
const moduleName = '[file] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { deleteMedia, getSignedUrl, uploadMedia } from '@thirdParty/aws';
import * as path from 'path';
import { statusCodes } from '@utils/constants';
import { deleteLocalCopy, getMediaType } from '@utils/utils';
import { RequestWithUser } from '@middlewares/auth';

export class FileController {
  public async saveFile(req: RequestWithUser, res: Response) {
    logger.info('[saveFile][body]', req.body);
    const { uId } = req.user;
    const { body } = req;
    const { files } = body;
    const data = [];
    try {
      for (const file of files) {
        const { mimetype, size, filename } = file;
        const filePath = path.resolve(__dirname, `../../uploads/${filename}`);

        const extension = path.extname(filename).toLowerCase();
        const mediaType = getMediaType(extension);

        const upload = (await uploadMedia(uId + '/' + filename, mimetype, filePath, res)) as {Location: string};
        const query = `INSERT INTO files (name, size, extension, type, url, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
        const params = [filename, size, extension, mediaType, upload.Location, uId];
        const result = await db.query(query, params);
        data.push({
          id: result.rows[0].id,
          name: filename,
          url: getSignedUrl(upload.Location),
          created_at: new Date().toISOString(),
          size: size,
          type: mediaType,
        });
        console.log('uploading...');
        deleteLocalCopy(filePath);
      }
      console.log('done');
      res.status(statusCodes.OK).json({ message: 'Files uploaded successfully!', data });
    } catch (error) {
      logger.error('[saveFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  public async getUserFiles(req: RequestWithUser, res: Response) {
    logger.info('[getUserFiles][params]');
    const { uId } = req.user;
    const query = `SELECT id, name, created_at, size, type, url FROM files WHERE owner_id = $1`;
    const params = [uId];
    try {
      const result = await db.query(query, params);
      let files = [];
      if (result && result.rows && result.rows.length > 0) {
        files = result.rows;
        for (const file of files) {
          if (file) file.url = getSignedUrl(file.url);
        }
      }
      res.status(statusCodes.OK).json({ message: 'File found!', data: files });
    } catch (error) {
      logger.error('[getUserFiles][err]', error.message);
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
      result.rows[0].url = getSignedUrl(result.rows[0].url);
      res.status(statusCodes.OK).json({ message: 'File found!', data: result.rows[0] });
    } catch (error) {
      logger.error('[getFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  public async deleteFile(req: RequestWithUser, res: Response) {
    logger.info('[deleteFile][body]', req.body);
    const { uId } = req.user;
    const { files } = req.body as unknown as { files: { id: number; name: string }[] };
    try {
      for (const file of files) {
        const query = `DELETE FROM files WHERE id = $1`;
        const params = [file.id];
        await db.query(query, params);
        // delete file from s3 bucket
        await deleteMedia(uId + '/' + file.name, res);
      }
      res.status(statusCodes.OK).json({ message: 'Files were deleted!' });
    } catch (error) {
      logger.error('[deleteFile][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
