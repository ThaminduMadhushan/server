import express from "express";
import { getBailer, getEmployee, addEmployee, changeStatus, getEmployeesFromUsers } from "../controllers/employee.js"; // Import the controller function for fetching customer details

const router = express.Router();

// Route to fetch customer details based on the user ID
router.get("/bailers", getBailer);
router.get("/all", getEmployee);
router.post("/add", addEmployee);
router.put("/status/:user_id", changeStatus);
router.get("/users/get", getEmployeesFromUsers);

export default router;
