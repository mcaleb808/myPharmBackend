import { Router } from 'express';
import PharmController from '../controllers/PharmController';
import PharmValidators from '../middleware/pharmValidators';

const router = Router();

router.get('/', PharmController.getAllPharms);
router.route('/').post(PharmValidators.request, PharmController.addPharm);
router.get('/:id', PharmController.getAPharm);
router.put('/:id', PharmController.updatePharm);
router.delete('/:id', PharmController.deletePharm);

export default router;
