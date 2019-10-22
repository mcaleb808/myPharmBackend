import { Router } from 'express';
import PharmController from '../controllers/PharmController';

const router = Router();

router.get('/', PharmController.getAllPharms);
router.post('/', PharmController.addPharm);
router.get('/:id', PharmController.getAPharm);
router.put('/:id', PharmController.updatePharm);
router.delete('/:id', PharmController.deletePharm);

export default router;
