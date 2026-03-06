import {user} from "../models/user.js"
import {parseResume} from "../utils/resumeParser.js"
import {getAIScores} from "../utils/gemini.js"

export const analyzeResume=async(req,res)=>{

try{

const userId=req.id;

const curruser=await user.findById(userId);

if(!curruser.resume){
return res.status(400).json({message:"resume not uploaded"});
}

const resumeText=await parseResume(curruser.resume);

const scores=await getAIScores(resumeText);

curruser.aiscores=scores;

await curruser.save();

res.json({
message:"resume analyzed",
scores
});

}
catch(err){
console.log(err);
res.status(500).json({message:"analysis failed"});
}

}