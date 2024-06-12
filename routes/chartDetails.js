import express from 'express';
import { getDriverCollection, getSalaryParameters, getProductDetails, getCustomerOrderDetails } from '../controllers/chartDetails.js';

const router = express.Router();

router.get('/driver/bin/collection/:id', getDriverCollection);
router.get('/employee/salary/parameters/:id', getSalaryParameters);
router.get('/product/details', getProductDetails);
router.get('/customer/order/details/:id', getCustomerOrderDetails);                                                                 

export default router;