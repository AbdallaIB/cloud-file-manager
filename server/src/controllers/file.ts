import loggerHandler from '@utils/logger';
const moduleName = '[file] ';
const logger = loggerHandler(moduleName);
import db from '@config/database';
import { Request, Response } from 'express';

export class FileController {
  public async saveFile(req: Request, res: Response) {}

  public async getFile(req: Request, res: Response) {}

  public async deleteFile(req: Request, res: Response) {}
}
