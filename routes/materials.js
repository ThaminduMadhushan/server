import express from 'express';
import { getMaterial, createMaterial, deleteMaterial, updateMaterial } from '../controllers/materials.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/', getMaterial);
// Route to handle adding a new product
router.post('/', createMaterial);
// Route to handle deleting a product
router.delete('/:id', deleteMaterial); // Define the delete route

router.put('/:id', updateMaterial);

export default router;