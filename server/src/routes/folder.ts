import { FolderController } from '@controllers/folder';
import { Router } from 'express';
import { body } from 'express-validator';

const index = (router: Router, folderController: FolderController) => {
  // get a folder
  router.get('/folder/:id', folderController.getFolder);
  // delete a folder
  router.delete('/folder/:id', folderController.deleteFolder);
  // save a folder
  router.post('/folder', folderController.saveFolder);
};

export default index;
