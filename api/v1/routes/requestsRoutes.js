import { Router } from 'express';
import PharmController from '../controllers/PharmController';
import authController from '../controllers/UserController';

const router = Router();

router
  .get('/', PharmController.getAllRequests)
  .put('/:id', PharmController.rejectRequest)
  .post('/', authController.signup)
  .post('/login', authController.login);

export default router;
