import { Router } from 'express';
import PharmController from '../controllers/PharmController';
import PharmValidators from '../middleware/pharmValidators';
import async from '../middleware/async';

const router = Router();

router.route('/')
  .get(async(PharmController.getAllPharms))
  .post(async(PharmValidators.request), PharmController.addPharm);

router.route('/:id')
  .get(async(PharmController.getAPharm))
  .put(async(PharmController.updatePharm))
  .delete(async(PharmController.deletePharm));

export default router;
