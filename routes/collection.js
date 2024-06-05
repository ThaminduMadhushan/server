import express from "express";
import {
  createDriverCollection,
  getDriversCollection,
  deleteDriverCollection,
  createCollection,
  getSupplierCollection,
  getCollection
} from "../controllers/collection.js";

const router = express.Router();

router.post("/", createDriverCollection);
router.get("/driver", getDriversCollection);
router.get("/supplier", getSupplierCollection);
router.delete("/driver/:id", deleteDriverCollection);
router.post("/driver", createCollection);
router.get("/all", getCollection);

export default router;