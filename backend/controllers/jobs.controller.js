import express from 'express'
import { job} from '../models/job.js'
import { company } from '../models/company.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createjob = async(req,res)=> {
    try {
        const {title, description,qualification,reqskills,minexp,location,salary,deadline}=req.body;
        const compid=req.id;
        console.log("Company ID from request:", req.id);
        const companyj = await company.findOne({_id:compid});
        if(!companyj)
        {
            console.log("error 1")
        }


        const newjob=await job.create({
            title,
            description,
            qualification,
            reqskills,
            minexp,
            location,
            salary,
            deadline,
            comp:compid
        })

        companyj.jobs.push(newjob._id); 
    await companyj.save();

        return res.status(201).json({
            message:"job created successfully",
            success:true,
        })

    }
    catch(error) {
        console.log("mmmmmm",error);
        console.error(error);
        return res.status(500).json({message:"Internal sever error",success:false});
    }
}

export const DisplayAllJobs=async(req,res)=> {
    const jobfull=await job.find().populate('comp');
    // console.log(job);
    if(!job) {
        console.log("No Job found");
    }

    console.log("Jobs fetched")
    return res.status(201).json({
        message:"fetched all jobs",
        success:true,
        job:jobfull,
    })

}

export const Findjob=async(req,res)=>{
    const { id } = req.query; 
    console.log(id);
    const jober = await job.findById(id); 
    if (!jober) {
        return res.status(404).json({ error: "Job not found" });
    }
    return res.json({job:jober});
}


