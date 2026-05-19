import axios from "axios";


const api = axios.create({
    baseURL: "https://d9vxjqxn-8000.inc1.devtunnels.ms/api",
    withCredentials: true,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((req) => {
    console.log("FINAL URL =>", req.baseURL + req.url);
    return req;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("FULL ERROR");
        console.log(error);
        const message = error.response?.data?.message || error.message;
        console.error("API Error:", message);
        return Promise.reject(error);
    }
);

export default api;