import { FolderController } from '@controllers/folder';
import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateToken } from '@middlewares/auth';
import { validateRequest } from '@middlewares/validator';

const index = (router: Router, folderController: FolderController) => {
  // get a folder
  router.get(
    '/folder/:id',
    [param('id').isEmpty().withMessage('Folder id missing')],
    validateRequest,
    validateToken,
    folderController.getFolder,
  );
  // delete a folder
  router.delete(
    '/folder/:id',
    [param('id').isEmpty().withMessage('Folder id missing')],
    validateRequest,
    validateToken,
    folderController.deleteFolder,
  );
  // save a folder
  router.post(
    '/folder',
    [body('folderName').isEmpty().withMessage('Folder name missing')],
    validateRequest,
    validateToken,
    folderController.saveFolder,
  );
};

export default index;
