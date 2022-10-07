import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req).formatWith(({ msg }) => `${msg}`);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array(), success: false });
  }
  next();
};
