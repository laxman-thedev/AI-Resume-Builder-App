import axios from 'axios'

// Create an Axios instance with a base URL
const api = axios.create({
    // Set the base URL for all requests made with this instance
    baseURL: import.meta.env.VITE_BASE_URL
})

// Export the configured Axios instance
export default api 