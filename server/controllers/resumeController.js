import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

/*
|--------------------------------------------------------------------------
| Resume Controller
|--------------------------------------------------------------------------
| Handles CRUD operations for user resumes
*/

/*
|--------------------------------------------------------------------------
| Create Resume
|--------------------------------------------------------------------------
| POST /api/resumes/create
| Creates a new resume for the logged-in user
*/
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ title, userId });

        return res.status(201).json({
            resume: newResume,
            message: "Resume created successfully"
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Delete Resume
|--------------------------------------------------------------------------
| DELETE /api/resumes/delete/:resumeId
| Deletes a resume owned by the logged-in user
*/
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Get Resume By ID (Private)
|--------------------------------------------------------------------------
| GET /api/resumes/get/:resumeId
| Fetches a resume for the logged-in user
*/
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Remove unnecessary fields
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Get Resume By ID (Public)
|--------------------------------------------------------------------------
| GET /api/resumes/public/:resumeId
| Fetches a publicly shared resume
*/
export const getResumeByIdPublic = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/*
|--------------------------------------------------------------------------
| Update Resume
|--------------------------------------------------------------------------
| PUT /api/resumes/update
| Updates resume content and uploads profile image if provided
*/
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, removeBackground } = req.body;
        const file = req.file;

        // Parse resume data safely
        const resumeDataCopy =
            typeof req.body.resumeData === "string"
                ? JSON.parse(req.body.resumeData)
                : structuredClone(req.body.resumeData);

        // Upload profile image if provided
        if (file) {
            const imageStream = fs.createReadStream(file.path);

            const response = await imageKit.files.upload({
                file: imageStream,
                fileName: `${userId}_resume.png`,
                folder: "user-resumes",
                transformation: {
                    pre:
                        "w-300,h-300,fo-face,z-0.75" +
                        (removeBackground === "yes" ? ",e-bgremove" : "")
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            resumeDataCopy,
            { new: true }
        );

        return res.status(200).json({
            resume: updatedResume,
            message: "Resume updated successfully"
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
