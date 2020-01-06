import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../middleware/userValidator';

const router = Router();

router
  .post('/', UserValidator.signup, UserController.signup)
  .post('/login', UserValidator.login, UserController.login);

export default router;
