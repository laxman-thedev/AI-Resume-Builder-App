import multer from "multer";

/*
|--------------------------------------------------------------------------
| Multer Configuration
|--------------------------------------------------------------------------
| Handles file uploads (used for resume images)
| Stored temporarily on disk before processing
*/
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;