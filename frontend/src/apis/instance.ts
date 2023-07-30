import axios from "axios";
export const instance = axios.create({
    baseURL: "https://inshare.enjoys.in",

    headers: {
        "Content-Type": "multipart/form-data",
    },
});
