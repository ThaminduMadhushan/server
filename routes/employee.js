import express from "express";
import { getBailer, getEmployee, addEmployee, changeStatus, getEmployeesFromUsers, getActiveEmployees, getInactiveEmployees, changeStatusActive } from "../controllers/employee.js"; 

const router = express.Router();

router.get("/bailers", getBailer);
router.get("/all", getEmployee);
router.post("/add", addEmployee);
router.put("/status/:user_id", changeStatus);
router.put("/status/inactive/:user_id", changeStatusActive);
router.get("/users/get", getEmployeesFromUsers);
router.get("/active", getActiveEmployees);
router.get("/inactive", getInactiveEmployees);

export default router;
