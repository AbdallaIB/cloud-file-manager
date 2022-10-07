import { Router } from 'express';
import defaultRouter from '@routes/default';
import fileRouter from '@routes/file';
import folderRouter from '@routes/folder';
import userRouter from '@routes/user';
import { FileController } from '@controllers/file';
import { FolderController } from '@controllers/folder';
import { UserController } from '@controllers/user';

const router = Router();
// Controllers
const fileController = new FileController();
const folderController = new FolderController();
const userController = new UserController();

// File routes
fileRouter(router, fileController);

// Folder routes
folderRouter(router, folderController);

// User routes
userRouter(router, userController);

// Default Routes, This line should be the last line of this module.
defaultRouter(router);

export default router;
