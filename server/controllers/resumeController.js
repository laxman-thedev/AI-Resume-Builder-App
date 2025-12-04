import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ title, userId });

        return res.status(201).json({ resume: newResume, message: "Resume created successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get resume by id public
// GET: /api/resumes/public
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
}

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, removeBackground } = req.body;
        const file = req.file; // <-- corrected

        let resumeDataCopy = typeof req.body.resumeData === "string"
            ? JSON.parse(req.body.resumeData)
            : structuredClone(req.body.resumeData);

        // If user uploaded a new image → upload to cloud
        if (file) {
            const imageBufferData = fs.createReadStream(file.path);

            const response = await imageKit.files.upload({
                file: imageBufferData,
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