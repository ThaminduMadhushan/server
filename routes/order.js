import express from 'express';
import { getOrder, createOrder, deleteOrder, updateOrder } from '../controllers/order.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/', getOrder);
// Route to handle adding a new product
router.post('/', createOrder);
// Route to handle deleting a product
router.delete('/:id', deleteOrder); // Define the delete route

router.put('/:id', updateOrder);

export default router;


