import { FolderController } from '@controllers/folder';
import { Router } from 'express';
import { body } from 'express-validator';

const index = (router: Router, folderController: FolderController) => {
  router.get('/folder/:id', folderController.getFolder);
  router.post('/folder/:id/delete', folderController.deleteFolder);
  router.post('/folder/create', folderController.saveFolder);
};

export default index;
