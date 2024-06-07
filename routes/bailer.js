import express from "express";
import { getBailer, getJobs, completeOrder, getBailingDetails, createBailing, getAcceptBailingDetails, updateBailing } from "../controllers/bailer.js";

const router = express.Router();

router.get("/:id", getBailer);
router.get("/jobs/:id", getJobs);
router.put("/complete/:id", completeOrder);
router.get("/bailing/details/:id", getBailingDetails);
router.post("/add", createBailing);
router.get("/details/accept/:id", getAcceptBailingDetails);
router.put("/details/update/:id", updateBailing);


export default router;