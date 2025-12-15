import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

/*
|--------------------------------------------------------------------------
| AI Controller
|--------------------------------------------------------------------------
| Handles AI-powered resume enhancements and resume parsing
*/

/*
|--------------------------------------------------------------------------
| Enhance Professional Summary
|--------------------------------------------------------------------------
| POST /api/ai/enhance-pro-sum
| Improves the professional summary using AI
*/
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "No content provided" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary to be concise, compelling, and impactful. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Enhance Job Description
|--------------------------------------------------------------------------
| POST /api/ai/enhance-job-desc
| Improves job description with concise and measurable impact
*/
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "No content provided" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance this job description to be concise and impactful. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Upload & Parse Resume
|--------------------------------------------------------------------------
| POST /api/ai/upload-resume
| Extracts structured resume data from uploaded resume text
*/
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "No content provided" });
        }

        const systemPrompt =
            "You are an expert AI agent that extracts structured data from resumes.";

        const userPrompt = `
            Extract data from the following resume text and return ONLY valid JSON:

            ${resumeText}

            JSON structure:
            {
                professional_summary: "",
                skills: [],
                personal_info: {
                    image: "",
                    full_name: "",
                    profession: "",
                    email: "",
                    phone: "",
                    location: "",
                    linkedin: "",
                    website: ""
                },
                experience: [],
                project: [],
                education: []
            }
        `;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
        });

        const parsedData = JSON.parse(response.choices[0].message.content);

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        return res.json({ resumeId: newResume._id });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};
