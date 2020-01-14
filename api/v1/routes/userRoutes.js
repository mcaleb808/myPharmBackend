import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../middleware/userValidator';
import grantAccess from '../middleware/grantAccess';
import async from '../middleware/async';
import checkAuth from '../middleware/checkAuth';

const router = Router();

router
  .post(
    '/',
    async(checkAuth),
    async(grantAccess('updateAny', 'pharm')),
    UserValidator.signup,
    UserController.signup,
  )
  .post('/login', UserValidator.login, UserController.login);

export default router;
