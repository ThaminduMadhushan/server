import express from "express";
import { getOrders, getAdmin, getAcceptedOrders, getCancelledOrders, getBailingDetails, getAcceptBailingDetails, AcceptBailing, getCompletedOrders, getFinishedOrders, updateAbout, updateDetails } from "../controllers/admin.js";

const router = express.Router();

router.get("/pending", getOrders);
router.get("/accept", getAcceptedOrders);
router.get("/cancelled", getCancelledOrders);
router.get("/completed", getCompletedOrders);
router.get("/finished", getFinishedOrders);
router.get("/:id", getAdmin);
router.get("/bailing/details", getBailingDetails);
router.get("/bailing/details/accept", getAcceptBailingDetails);
router.put("/bailing/details/accept", AcceptBailing);
router.put("/edit/about/:id", updateAbout);
router.put("/:id", updateDetails);


export default router;
