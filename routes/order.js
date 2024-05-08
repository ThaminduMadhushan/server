import express from "express";
import {
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  acceptOrder,
  cancelOrder
} from "../controllers/order.js";

const router = express.Router();

router.get("/:id", getOrder);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);
router.put("/accept/:id", acceptOrder);
router.put("/cancel/:id", cancelOrder);

export default router;
