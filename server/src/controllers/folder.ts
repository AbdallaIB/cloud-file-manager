import loggerHandler from '@utils/logger';
const moduleName = '[folder] ';
const logger = loggerHandler(moduleName);
import { Request, Response } from 'express';

export class FolderController {
  public async saveFolder(req: Request, res: Response) {}
  public async deleteFolder(req: Request, res: Response) {}
  public async getFolder(req: Request, res: Response) {}
}
