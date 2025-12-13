import express from "express";
import {
    getUserById,
    getUserResumes,
    loginUser,
    registerUser
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
| Handles authentication and user-related data
*/
const userRouter = express.Router();

/*
| Register a new user
| POST /api/users/register
*/
userRouter.post("/register", registerUser);

/*
| Login user
| POST /api/users/login
*/
userRouter.post("/login", loginUser);

/*
| Get logged-in user data
| GET /api/users/data
*/
userRouter.get("/data", protect, getUserById);

/*
| Get all resumes of logged-in user
| GET /api/users/resumes
*/
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;