// import express from "express";
// import { getUserDetails, getNewUsers, getMaterials, getProducts, getMonthlyMaterials, getMonthlyProducts, getTotalSalary } from "../controllers/report.js";

// const router = express.Router();

// router.get("/user/details", getUserDetails);
// router.post("/new/users", getNewUsers);
// router.get("/materials", getMaterials);
// router.get("/products", getProducts);
// router.post("/monthly/materials", getMonthlyMaterials);
// router.post("/monthly/products", getMonthlyProducts);
// router.post("/total/salary", getTotalSalary);

// export default router;

import { Router } from 'express';
import { getUserDetails, getNewUsers, getMaterials, getProducts, getMonthlyMaterials, getMonthlyProducts, getTotalSalary, getTotalOrders, getTotalFinishedOrders, getTotalCancelledOrders, getTotalProductQuantity, getTotalMaterialCollected, getTotalCollectionBins, getMostCollectedSupplier } from "../controllers/report.js";

const router = Router();

router.get('/user/details', getUserDetails);
router.post('/new/users', getNewUsers);
router.get('/materials', getMaterials);
router.get('/products', getProducts);
router.post('/monthly/materials', getMonthlyMaterials);
router.post('/monthly/products', getMonthlyProducts);
router.post('/total/salary', getTotalSalary);
router.post('/total/orders', getTotalOrders);
router.post('/total/finished/orders', getTotalFinishedOrders);
router.post('/total/cancelled/orders', getTotalCancelledOrders);
router.post('/total/product/quantity', getTotalProductQuantity);
router.get('/total/material/collected', getTotalMaterialCollected);
router.get('/total/collection/bins', getTotalCollectionBins);
// router.post('/monthly/collection/bins', getMonthlyCollectionBins);
// router.post('/most/collected/driver', getMostCollectedDriver);
router.post('/most/collected/supplier', getMostCollectedSupplier);

export default router;
