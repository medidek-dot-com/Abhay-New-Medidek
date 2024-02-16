import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
    baseURL: "http://localhost:5001",
    // withCredentials: true
});

// export const axiosClient = axios.create({
//     baseURL: "https://mehrhospitality.com/",
//     // withCredentials: true
// });

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
});

axiosClient.interceptors.response.use(
    async (respon) => {
        const data = respon.data;
        if (data.status === "ok") {
            return data;
        }
        const originalRequest = respon.config;
        const statusCode = data.statusCode;

        if (statusCode === 401 && data.message === "Invalid access key") {
            // originalRequest._retry = true;

            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/");
        }

        return Promise.reject(data);
    },
    (error) => {
        console.error("Request error", error);
        return Promise.reject(error);
    }
);
