import pdf from "pdf-parse";
import axios from "axios";

export const parseResume = async (resumeUrl) => {

    const response = await axios.get(resumeUrl,{responseType:"arraybuffer"});

    const data = await pdf(response.data);

    return data.text;
}