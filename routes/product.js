import express from 'express';
import { getProducts, createProduct, deleteProduct, updateProduct, changeStatusProduct, getDisabledProducts, changeStatusDisableProduct } from '../controllers/product.js';


const router = express.Router();

// Route to handle fetching all products
router.get('/', getProducts);
// Route to handle adding a new product
router.post('/', createProduct);
// Route to handle deleting a product
router.delete('/:id', deleteProduct); // Define the delete route

router.put('/:id', updateProduct);

router.put('/changeStatus/:id', changeStatusProduct);

router.get('/disabled', getDisabledProducts);

router.put('/changeStatusDisable/:id', changeStatusDisableProduct);

export default router;


