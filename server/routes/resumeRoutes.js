import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    createResume,
    deleteResume,
    getResumeById,
    getResumeByIdPublic,
    updateResume
} from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

/*
|--------------------------------------------------------------------------
| Resume Routes
|--------------------------------------------------------------------------
| Handles resume creation, update, delete and fetch
*/
const resumeRouter = express.Router();

/*
| Create a new resume
| POST /api/resumes/create
*/
resumeRouter.post("/create", protect, createResume);

/*
| Update resume data (with optional image upload)
| PUT /api/resumes/update
*/
resumeRouter.put("/update", upload.single('image'), protect, updateResume);

/*
| Delete a resume by ID
| DELETE /api/resumes/delete/:resumeId
*/
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

/*
| Get resume by ID (private)
| GET /api/resumes/get/:resumeId
*/
resumeRouter.get("/get/:resumeId", protect, getResumeById);

/*
| Get resume by ID (public view)
| GET /api/resumes/public/:resumeId
*/
resumeRouter.get("/public/:resumeId", getResumeByIdPublic);

export default resumeRouter;
