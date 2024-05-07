import express from 'express';
import { getCustomer } from '../controllers/customer.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/:id', getCustomer);
// Route to handle adding a new product
// router.post('/', createMaterial);
// // Route to handle deleting a product
// router.delete('/:id', deleteMaterial); // Define the delete route

// router.put('/:id', updateMaterial);

export default router;