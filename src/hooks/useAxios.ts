import axios from "axios";
export default function useAxios() {
    const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
    return instance;
}
