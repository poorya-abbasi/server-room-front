"use client";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Scatter } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    ids: string[];
    title: string;
};

export default function ScatterChart({ ids, title }: Props) {
    const [sensor, setSensor] = useState<any>();
    const [sensorType, setSensorType] = useState<string>();
    const [loading, setLoading] = useState(true);
    const instance = useAxios();
    const router = useRouter();

    const getSensorData = async () => {
        const tempMetrics = await instance.get(`/sensors/${ids[0]}`).then((res) => {
            const sensor = res.data;
            setSensorType(sensor.type);

            let metrics = [];
            switch (sensor.type) {
                case "electric":
                    metrics = sensor.ElecMetrics;
                    break;
                case "condition":
                    metrics = sensor.ConditonMetrics;
                    break;
                case "event":
                    metrics = sensor.Events;
                    break;
            }
            return metrics;
        });
        const humiMetrics = await instance.get(`/sensors/${ids[1]}`).then((res) => {
            const sensor = res.data;
            setSensorType(sensor.type);
            let metrics = [];
            switch (sensor.type) {
                case "electric":
                    metrics = sensor.ElecMetrics;
                    break;
                case "condition":
                    metrics = sensor.ConditonMetrics;
                    break;
                case "event":
                    metrics = sensor.Events;
                    break;
            }
            return metrics;
        });
        setSensor({
            datasets: [
                {
                    label: "مقدار گزارش شده",
                    data: tempMetrics.map((metric: any, index: number) => ({
                        x: metric.value,
                        y: humiMetrics[index]?.value,
                    })),
                    borderColor: "#333",
                    backgroundColor: "#333",
                    tension: 0.3,
                    borderDash: [3],
                },
            ],
        });
        setLoading(false);
    };

    useEffect(() => {
        getSensorData();
    }, []);

    const goBack = () => {
        router.back();
    };
    return (
        <div className="flex flex-col gap-8 items-center">
            {loading || !sensor ? (
                <Loading />
            ) : (
                <>
                    <Scatter
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                    position: "top" as const,
                                },
                            },
                            scales: {
                                y: {
                                    suggestedMin:
                                        sensorType === "condition"
                                            ? 20
                                            : sensorType === "electric"
                                            ? 20
                                            : 0,
                                    suggestedMax:
                                        sensorType === "condition"
                                            ? 60
                                            : sensorType === "electric"
                                            ? 240
                                            : 0,
                                },
                            },
                        }}
                        data={sensor}
                    />
                    <span>{title}</span>
                    <div className="grid grid-cols-2 gap-8"></div>
                    <div className="flex gap-3"></div>
                </>
            )}
        </div>
    );
}
