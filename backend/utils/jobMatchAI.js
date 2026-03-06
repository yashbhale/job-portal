import axios from "axios"

export const getJobMatchScore = async (resumeText, jobDescription, skills) => {

    const prompt = `
    Evaluate how well the following candidate resume matches the job.

    Return only a number from 0-100 representing the match score.

    Job description:
    ${jobDescription}

    Required skills:
    ${skills.join(",")}

    Candidate resume:
    ${resumeText}
    `

    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
        {
            contents:[{parts:[{text:prompt}]}],
        }
    )

    const score = response.data.candidates[0].content.parts[0].text

    return parseInt(score)

}