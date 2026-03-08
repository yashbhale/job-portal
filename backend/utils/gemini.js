import axios from "axios";

export const getAIScores = async (resumeText) => {
  const prompt = `
Analyze the following resume and give skill scores from 0-10.

Categories:
Web Development
AI/ML
Data Structures and Algorithms
App Development

Return JSON:

{
"webdev": number,
"aiml": number,
"dsa": number,
"appdev": number
}

Resume:
${resumeText}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
  );

  const result = response.data.candidates[0].content.parts[0].text;

  return JSON.parse(result);
};
