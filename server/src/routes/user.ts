import { UserController } from '@controllers/user';
import { Router } from 'express';
import { body } from 'express-validator';
import { validateToken } from 'src/middlewares/auth';

const index = (router: Router, userController: UserController) => {
  // get a user
  router.get('/user/:id', validateToken, userController.getUser);
  // login a user
  router.post('/login', userController.loginUser);
  // register a user
  router.post('/register', userController.registerUser);
};

export default index;
