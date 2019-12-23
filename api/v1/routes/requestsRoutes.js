import { Router } from 'express';
import PharmController from '../controllers/PharmController';

const router = Router();

router.get('/', PharmController.getAllRequests);
router.put('/:id', PharmController.rejectRequest);

export default router;
