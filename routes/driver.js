import express from "express";
import { getBin, getDriver, getDriverCollection, getUserId, updateAbout, updateDetails, getSalary } from "../controllers/driver.js";

const router = express.Router();

router.get("/bin", getBin);
router.get("/:id", getDriver);
router.get("/collection/:id", getDriverCollection);
router.get("/user/:id", getUserId);
router.put("/edit/about/:id", updateAbout);
router.put("/:id", updateDetails);
router.get("/salary/:id", getSalary);

export default router;
