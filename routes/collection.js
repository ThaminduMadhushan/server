import express from "express";
import {
  createDriverCollection,
  getDriversCollection,
  deleteDriverCollection,
  createCollection,
  getSupplierCollection
} from "../controllers/collection.js";

const router = express.Router();

router.post("/", createDriverCollection);
router.get("/driver", getDriversCollection);
router.get("/supplier", getSupplierCollection);
router.delete("/driver/:id", deleteDriverCollection);
router.post("/driver", createCollection);

export default router;