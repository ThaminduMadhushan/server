import express from 'express';
import { getCustomer, getPendingOrder, getAcceptedOrder, getCancelledOrder, getHomeAcceptedOrder, getHomeCancelledOrder, updateOrderSeen, updateAbout, updateDetails } from '../controllers/customer.js';

const router = express.Router();

router.get('/:id', getCustomer);
router.get('/pending/:id', getPendingOrder);
router.get('/accepted/:id', getAcceptedOrder);
router.get('/cancelled/:id', getCancelledOrder);
router.get('/home/accepted/:id', getHomeAcceptedOrder); 
router.get('/home/cancelled/:id', getHomeCancelledOrder);
router.post('/seen', updateOrderSeen);
router.put('/edit/about/:id', updateAbout);
router.put('/:id', updateDetails);

export default router;