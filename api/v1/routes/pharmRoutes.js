import { Router } from 'express';
import PharmController from '../controllers/PharmController';
import PharmValidators from '../middleware/pharmValidators';

const router = Router();

router.route('/')
  .get(PharmController.getAllPharms)
  .post(PharmValidators.request, PharmController.addPharm);

router.route('/:id')
  .get(PharmController.getAPharm)
  .put(PharmController.updatePharm)
  .delete(PharmController.deletePharm);

export default router;
