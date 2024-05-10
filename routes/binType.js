import express from 'express';
import { getBinType, createBinType, deleteBinType, updateBinType } from '../controllers/binType.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/', getBinType);
// Route to handle adding a new product
router.post('/', createBinType);
// Route to handle deleting a product
router.delete('/:id', deleteBinType); // Define the delete route

router.put('/:id', updateBinType);

export default router;