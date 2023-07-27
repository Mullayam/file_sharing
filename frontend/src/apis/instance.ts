import axios from "axios";
export const instance = axios.create({
    baseURL: "http://localhost:7132/api",

    headers: {
        "Content-Type": "multipart/form-data",
    },
});
