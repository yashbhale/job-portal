import express from "express";
import {analyzeResume} from "../controllers/ai.controller.js";

const router=express.Router();

router.get("/analyze-resume",analyzeResume);

export default router;