import express from "express";
import { createjob, DisplayAllJobs, Findjob } from "../controllers/jobs.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.route('/createjob').post(isAuthenticated,createjob);
router.route('/displayjobs').get(DisplayAllJobs);
router.route('/findjob').get(Findjob);

export default router;