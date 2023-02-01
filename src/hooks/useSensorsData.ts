import axios from "axios";
import { ChartData } from "chart.js";
import useAxios from "./useAxios";
export default async function useSensorsData() {
    return new Promise((resolve, reject) => {
        const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
        instance
            .get("/sensors")
            .then(({ data }) => {
                const values: number[] = [0, 0, 0];
                const labels = ["الکتریکی", "شرایط", "رخداد"];
                const backgroundColor = ["#F28F3B", "#333", "#aaa"];
                data.forEach((sensor: Sensor) => {
                    switch (sensor.type) {
                        case "electric":
                            values[0] += 1;
                            break;
                        case "condition":
                            values[1] += 1;
                            break;
                        case "event":
                            values[2] += 1;
                            break;
                    }
                });
                const full = {
                    labels,
                    datasets: [
                        {
                            label: "تعداد سنسور های آنلاین",
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
