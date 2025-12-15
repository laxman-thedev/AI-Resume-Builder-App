import OpenAI from "openai";

/*
|--------------------------------------------------------------------------
| OpenAI Configuration
|--------------------------------------------------------------------------
| Initializes OpenAI client using API key and base URL
| Used for resume enhancement and AI-powered features
*/
const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

export default ai;