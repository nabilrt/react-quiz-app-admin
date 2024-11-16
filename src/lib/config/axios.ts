import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

instance.interceptors.request.use(
    /**
     * Interceptor function for axios requests to add authorization header with JWT token.
     *
     * @remarks
     * This interceptor is added to the axios instance in `src/lib/config/axios.ts`.
     * It checks if a JWT token is present in the local storage and adds it to the
     * Authorization header of the request.
     *
     * @param config - The axios request configuration object.
     * @returns The modified axios request configuration object with the added Authorization header.
     */
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },


    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
