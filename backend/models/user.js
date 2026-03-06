import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneno: String,
        skills: {
            type:[String],
        },
        resume: { type: String, default: null },
        resumename: String,
        cgpa: Number,
        experience: Number,
        gradyear:Number,
        photo: { type: String, default: null },
        aiscores: {
            webdev: { type: Number, default: 0 },
            aiml: { type: Number, default: 0 },
            dsa: { type: Number, default: 0 },
            appdev: { type: Number, default: 0 }
        }
    
},{timestamps:true});

export const user=mongoose.models.user || mongoose.model('user',schema);       
