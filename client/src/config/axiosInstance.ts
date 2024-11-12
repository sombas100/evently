import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:5240",
    headers: {
        'Content-Type': 'application/json'
    }
})

export default client;