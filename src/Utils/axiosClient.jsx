import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

// export const axiosClient = axios.create({
//     baseURL: "https://beyondblack.agency",
//     // withCredentials: true,
// });

// export const baseURL = "https://beyondblack.agency";

// export const axiosClient = axios.create({
//     baseURL: "http://localhost:5001",
//     // //     // withCredentials: true,
// });

// export const baseURL = "http://localhost:5001";
// export const baseURL = "http://localhost:5001";

export const axiosClient = axios.create({
    baseURL: "https://mehrhospitality.com/",
    // withCredentials: true
});


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
            // try {
            //     const refreshResponse = await axios.get(`${baseURL}/v2/refresh`, {
            //         withCredentials: true,
            //     });

            //     if (refreshResponse.data.status === "ok") {
            //         setItem(KEY_ACCESS_TOKEN, refreshResponse.data.result.accessToken);
            //         console.log("Access token updated");
            //         originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.result.accessToken}`;
            //         return axios(originalRequest);
            //     } else {
            //         removeItem(KEY_ACCESS_TOKEN);
            //         console.error("Access token refresh failed");
            //         window.location.replace("/master/signin");
            //     }
            // } catch (refreshError) {
            //     console.error("Error refreshing access token", refreshError);
            //     removeItem(KEY_ACCESS_TOKEN);
            //     window.location.replace("/master/signin");
            // }
        }

        return Promise.reject(data);
    },
    (error) => {
        console.error("Request error", error);
        return Promise.reject(error);
    }
);
