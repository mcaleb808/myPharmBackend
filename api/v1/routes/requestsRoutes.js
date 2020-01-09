import { Router } from 'express';
import PharmController from '../controllers/PharmController';
import Requests from '../controllers/RequestsController';
import grantAccess from '../middleware/grantAccess';
import checkAuth from '../middleware/checkAuth';
import async from '../middleware/async';
import authController from '../controllers/UserController';

const router = Router();

router.route('/')
  .get(PharmController.getAllRequests)
  .post(authController.signup);
router
  .put('/:id', PharmController.rejectRequest)
  .post('/login', authController.login)
  .patch('/:id/confirm',
    async(checkAuth),
    async(grantAccess('updateAny', 'profile')),
    async(Requests.confirm));

export default router;
