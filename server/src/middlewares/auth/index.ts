import { statusCodes } from '@utils/constants';
import loggerHandler from '@utils/logger';
const moduleName = '[auth] ';
const logger = loggerHandler(moduleName);
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = getToken(req);

  verify(bearerToken, process.env.TOKEN_SECRET_KEY ? process.env.TOKEN_SECRET_KEY : 'secretkey', (err, authData) => {
    if (err) {
      logger.error('[validateToken][Error] ', 'Token has been Expired');
      return res.status(statusCodes.UNAUTHORIZED).json({
        message: 'Session has been expired',
      });
    }
    logger.info('[validateToken][authData]', authData);

    req['user'] = authData;
    next();
  });
};

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
      ? req.headers.authorization.split(' ')[1]
      : req.headers.authorization.split(' ')[2];
  }
  return null;
};
