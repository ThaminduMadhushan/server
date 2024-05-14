import express from "express";
import {
  createDriverCollection,
  getDriversCollection,
  deleteDriverCollection
} from "../controllers/collection.js";

const router = express.Router();

router.post("/", createDriverCollection);
router.get("/driver", getDriversCollection);
router.delete("/driver/:id", deleteDriverCollection);

export default router;