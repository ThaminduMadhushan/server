import express from "express";
import { getBin, getDriver, getDriverCollection, getUserId} from "../controllers/driver.js";

const router = express.Router();

router.get("/bin", getBin);
router.get("/:id", getDriver);
router.get("/collection/:id", getDriverCollection);
router.get("/user/:id", getUserId);

export default router;
