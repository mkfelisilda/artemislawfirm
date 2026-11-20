import axios from "axios";

// 1. Tell Axios where your backend lives
// (If you are using JSON server or a fake API, put that URL here.
// e.g., "http://localhost:3000")
const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
});

// 2. The Request Interceptor (The VIP Wristband rule)
api.interceptors.request.use((config) => {
    // Look for the token in the user's "pocket" (localStorage)
    const token = localStorage.getItem("authToken");

    // If it exists, attach it to the request headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 3. The Response Interceptor (The 401 Bouncer rule)
api.interceptors.response.use(
    (response) => {
        // If the request is successful, just let it pass through
        return response;
    },
    (error) => {
        // If the server says 401 (Unauthorized / Bad Wristband)
        if (error.response && error.response.status === 401) {
            // 1. Throw the old token in the trash
            localStorage.removeItem("authToken");
            localStorage.removeItem("loggedInUser");

            // 2. Kick them back to the login screen
            // (Using window.location because this file doesn't have access to Vue's router)
            window.location.href = "/";
        }
        return Promise.reject(error);
    },
);

export default api;
