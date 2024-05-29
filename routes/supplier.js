import express from 'express';
import { getSupplier, createSupplierCollection, getUser, getAllSuppliers } from '../controllers/supplier.js';

const router = express.Router();

router.get('/get', getAllSuppliers);
router.get('/:id', getSupplier);
router.post('/create', createSupplierCollection);
router.get('/user/:id', getUser);


export default router;