// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";

// Auth slice reducer (handles user auth state)
import authReducer from "../features/authSlice.js";

// Create and export the Redux store
export const store = configureStore({
    reducer: {
        // Authentication-related state
        auth: authReducer
    }
});