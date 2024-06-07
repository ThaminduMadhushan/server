import express from "express";
import { getParameters, addParameters, updateParameters, getSalary, saveSalary, driverCollection, bailerCollection,   } from "../controllers/salary.js";

const router = express.Router();

router.get("/parameters", getParameters);
router.post("/parameters/add", addParameters);
router.put("/parameters/update/:id", updateParameters);
router.get("/get", getSalary);
router.post("/save", saveSalary);
router.get("/collection/driver", driverCollection);
router.get("/collection/bailer", bailerCollection);


export default router