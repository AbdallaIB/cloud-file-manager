import loggerHandler from '@utils/logger';
const moduleName = '[user] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { statusCodes } from '@utils/constants';

export class UserController {
  public async getUser(req: Request, res: Response) {
    logger.info('[getUser][body]', req.body);
  }

  public async loginUser(req: Request, res: Response) {
    logger.info('[loginUser][body]', req.body);
  }

  public async registerUser(req: Request, res: Response) {
    logger.info('[registerUser][body]', req.body);
    const { username } = req.body;
    const query = `INSERT INTO users (username) VALUES ($1)`;
    const params = [username];
    try {
      await db.query(query, params);
      res.status(statusCodes.OK).json({ message: 'User registered successfully!' });
    } catch (error) {
      logger.error('[registerUser][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
