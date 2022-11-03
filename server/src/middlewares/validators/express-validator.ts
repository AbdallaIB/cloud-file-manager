import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { statusCodes } from '@utils/constants';

export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req).formatWith(({ msg }) => `${msg}`);
  console.log('errors', errors);
  if (!errors.isEmpty()) {
    return res.status(statusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};
