import express from "express";
import { getBailer } from "../controllers/employee.js"; // Import the controller function for fetching customer details

const router = express.Router();

// Route to fetch customer details based on the user ID
router.get("/bailers", getBailer);

export default router;
