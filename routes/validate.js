import express from "express";
import { getEmail } from "../controllers/validate.js";

const router = express.Router();

router.get("/email", getEmail);

export default router