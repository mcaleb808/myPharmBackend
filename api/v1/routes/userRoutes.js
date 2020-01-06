import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../middleware/userValidator';
import grantAccess from '../middleware/grantAccess';
import tokenValidator from '../helpers/tokenValidator';

const router = Router();

router
  .post(
    '/',
    tokenValidator,
    grantAccess('readOwn', 'pharm'),
    UserValidator.signup,
    UserController.signup
  )
  .post('/login', UserValidator.login, UserController.login);

export default router;
