import express from "express";
import { getBin, getDriver, getDriverCollection} from "../controllers/driver.js";

const router = express.Router();

router.get("/bin", getBin);
router.get("/:id", getDriver);
router.get("/collection/:id", getDriverCollection);

export default router;
