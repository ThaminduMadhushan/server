import express from 'express';
import { getSupplier, createSupplierCollection, getUser, getAllSuppliers, getSupplierCollection, updateAbout, updateDetails } from '../controllers/supplier.js';

const router = express.Router();

router.get('/get', getAllSuppliers);
router.get('/:id', getSupplier);
router.post('/create', createSupplierCollection);
router.get('/user/:id', getUser);
router.get('/collection/:id', getSupplierCollection);
router.put('/edit/about/:id', updateAbout);
router.put('/:id', updateDetails);


export default router;