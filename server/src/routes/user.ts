import { UserController } from '@controllers/user';
import { Router } from 'express';
import { param } from 'express-validator';
import { validateToken } from '@middlewares/auth';
import { validateRequest } from '@middlewares/validators/express-validator';

const index = (router: Router, userController: UserController) => {
  // get a user
  router.get(
    '/user/:id',
    [param('id').isEmpty().withMessage('User id missing')],
    validateRequest,
    validateToken,
    userController.getUser,
  );
};

export default index;
