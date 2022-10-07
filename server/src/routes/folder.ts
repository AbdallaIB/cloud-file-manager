import { FolderController } from '@controllers/folder';
import { Router } from 'express';
import { body } from 'express-validator';
import { validateToken } from 'src/middlewares/auth';

const index = (router: Router, folderController: FolderController) => {
  // get a folder
  router.get('/folder/:id', validateToken, folderController.getFolder);
  // delete a folder
  router.delete('/folder/:id', validateToken, folderController.deleteFolder);
  // save a folder
  router.post('/folder', validateToken, folderController.saveFolder);
};

export default index;
