import { Router } from 'express';
import defaultRouter from '@routes/default';
import fileRouter from '@routes/file';
import userRouter from '@routes/user';
import authRouter from '@routes/auth';
import { FileController } from '@controllers/file';
import { UserController } from '@controllers/user';
import { AuthController } from '@controllers/auth';

const router = Router();
// Controllers
const fileController = new FileController();
const userController = new UserController();
const authController = new AuthController();

// auth routes
authRouter(router, authController);

// File routes
fileRouter(router, fileController);

// User routes
userRouter(router, userController);

// Default Routes, This line should be the last line of this module.
defaultRouter(router);

export default router;
