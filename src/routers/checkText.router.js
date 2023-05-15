import { Router } from "express";
/**
 * Check Text routes
 */

import checkText from "../controllers/checkText.controller.js";

const router = Router();

router.post("/", checkText);

export default router;
