import express from "express";
import { getParameters, addParameters, updateParameters, saveSalary, driverCollection, bailerCollection, allDriverCollection, allBailerCollection, getPaidSalary, getUnpaidSalary, updatePaymentStatus } from "../controllers/salary.js";

const router = express.Router();

router.get("/parameters", getParameters);
router.post("/parameters/add", addParameters);
router.put("/parameters/update/:id", updateParameters);
router.get("/get/unpaid", getUnpaidSalary);
router.post("/save", saveSalary);
router.get("/collection/driver", driverCollection);
router.get("/collection/bailer", bailerCollection);
router.get("/all/collection/driver", allDriverCollection);
router.get("/all/collection/bailer", allBailerCollection);
router.get("/get/paid", getPaidSalary);
router.put("/pay/:id", updatePaymentStatus);


export default router