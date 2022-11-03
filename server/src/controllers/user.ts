import loggerHandler from '@utils/logger';
const moduleName = '[user] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { statusCodes } from '@utils/constants';

export class UserController {
  public async getUser(req: Request, res: Response) {
    logger.info('[getUser][params]', req.params);
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    try {
      const result = await db.query(query, params);
      return res.status(statusCodes.OK).json({ message: 'User found!', data: result.rows[0] });
    } catch (error) {
      logger.error('[getUser][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
