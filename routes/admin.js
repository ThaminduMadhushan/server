import express from "express";
import { getOrders, getAdmin, getAcceptedOrders, getCancelledOrders } from "../controllers/admin.js";

const router = express.Router();

router.get("/pending", getOrders);
router.get("/accept", getAcceptedOrders);
router.get("/cancelled", getCancelledOrders);
router.get("/:id", getAdmin);

export default router;
