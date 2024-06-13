import express from 'express';
import { getBin, createBin, deleteBin, updateBin, getDisableBin, changeStatusDisableBin, changeStatusEnableBin } from '../controllers/bin.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/', getBin);
// Route to handle adding a new product
router.post('/', createBin);
// Route to handle deleting a product
router.delete('/:id', deleteBin); // Define the delete route

router.put('/:id', updateBin);

router.get('/disable', getDisableBin);

router.put('/disable/:id', changeStatusDisableBin);

router.put('/enable/:id', changeStatusEnableBin);

export default router;