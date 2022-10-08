import loggerHandler from '@utils/logger';
const moduleName = '[user] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';
import { statusCodes } from '@utils/constants';
import { sign } from 'jsonwebtoken';
import { User } from '@middlewares/auth';

export class UserController {
  public async getUser(req: Request, res: Response) {
    logger.info('[getUser][params]', req.params);
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    try {
      const result = await db.query(query, params);
      return res.status(statusCodes.OK).json({ message: 'User found!', result: result.rows[0] });
    } catch (error) {
      logger.error('[getUser][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
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
      const result = await db.query(query, params);
      const token = this.generateToken({ uId: result.rows[0].id, username });
      return res.status(statusCodes.OK).json({ message: 'User registered successfully!', token });
    } catch (error) {
      logger.error('[registerUser][err]', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  private async generateToken(user: User) {
    const { uId, username } = user;

    const token = sign(
      {
        uId,
        username,
      },
      process.env.TOKEN_SECRET_KEY ? process.env.TOKEN_SECRET_KEY : 'secretkey',
      { expiresIn: process.env.TOKEN_EXPIRE_TIME_SEC },
    );

    return token;
  }
}
