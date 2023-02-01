import axios from "axios";
import useAxios from "./useAxios";
export default async function useStatsData() {
    return new Promise((resolve, reject) => {
        const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
        instance
            .get("/sensors/stats")
            .then(({ data }) => {
                const values: number[] = [data.electric, data.condition, data.event];
                const labels = ["الکتریکی", "وضعیت", "زخداد"];
                const backgroundColor = ["#F28F3B", "#333", "#aaa"];
                const full = {
                    labels,
                    datasets: [
                        {
                            label: "تعداد داده های ثبت شده",
                            data: values,
                            backgroundColor,
                        },
                    ],
                };
                resolve({ chart: full, raw: data });
            })
            .catch((error) => {
                reject(error);
            });
    });
}
