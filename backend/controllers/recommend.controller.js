import { user } from "../models/user.js"
import { job } from "../models/job.js"
import { parseResume } from "../utils/resumeParser.js"
import { getJobMatchScore } from "../utils/jobMatchAI.js"

export const recommendJobs = async (req, res) => {

    try{

    const userid = req.id

    const curruser = await user.findById(userid)

    if(!curruser){
        return res.status(404).json({message:"User not found"})
    }

    const scores = curruser.aiscores || {}

    let domain

    if(scores.webdev >= scores.aiml && scores.webdev >= scores.dsa){
    domain = "web"
    }
    else if(scores.aiml >= scores.webdev && scores.aiml >= scores.dsa){
    domain = "aiml"
    }
    else{
    domain = "dsa"
    }

    const jobs = await job.find({
    reqskills: { $regex: domain, $options: "i" }
    }).populate("comp")

    if(!curruser.resume){
    return res.status(400).json({message:"Resume not uploaded"})
    }

    const resumeText = await parseResume(curruser.resume)

    const userSkills = curruser.skills || []

    const recommendations = await Promise.all(

    jobs.map(async (j) => {

    let match = 0

    userSkills.forEach(skill => {
    if(j.reqskills.map(s=>s.toLowerCase()).includes(skill.toLowerCase())){
    match++
    }
    })

    const skillMatchScore = j.reqskills.length
    ? Math.round((match / j.reqskills.length) * 100)
    : 0

    const aiMatchScore = await getJobMatchScore(
    resumeText,
    j.description,
    j.reqskills
    )

    const finalScore = Math.round((skillMatchScore*0.4) + (aiMatchScore*0.6))

    return {
    job: j,
    skillMatchScore,
    aiMatchScore,
    finalScore
    }

    })

    )

    recommendations.sort((a,b)=>b.finalScore-a.finalScore)

    res.json({
    recommendedDomain: domain,
    jobs: recommendations.slice(0,5)
    })

    }
    catch(err){
    console.log(err)
    res.status(500).json({message:"recommendation failed"})
    }

}