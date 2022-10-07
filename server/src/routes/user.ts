import { UserController } from '@controllers/user';
import { Router } from 'express';
import { body } from 'express-validator';

const index = (router: Router, userController: UserController) => {
  router.get('/user/:id', userController.getUser);
  router.post('/user/login', userController.loginUser);
  router.post('/user/register', userController.registerUser);
};

export default index;
