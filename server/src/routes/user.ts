import { UserController } from '@controllers/user';
import { Router } from 'express';
import { param } from 'express-validator';
import { validateToken } from '@middlewares/auth';
import { validateRequest } from '@middlewares/validator';

const index = (router: Router, userController: UserController) => {
  // get a user
  router.get(
    '/user/:id',
    [param('id').isEmpty().withMessage('User id missing')],
    validateRequest,
    validateToken,
    userController.getUser,
  );
  // login a user
  router.post('/login', userController.loginUser);
  // register a user
  router.post('/register', userController.registerUser);
};

export default index;
