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
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EditSensor({ params }: any) {
    const [sensor, setSensor] = useState<any>();
    const [sensorType, setSensorType] = useState<string>();
    const [sensorName, setSensorName] = useState<string>();
    const [loading, setLoading] = useState(true);
    const instance = useAxios();
    const router = useRouter();
    useEffect(() => {
        instance.get(`/sensors/${params.id}`).then((res) => {
            const sensor = res.data;
            setSensorType(sensor.type);
            setSensorName(sensor.name);
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
            setSensor({
                labels: metrics.map((metric: any) =>
                    dayjs(metric.createdAt).locale("fa").format("YYYY/MM/DD HH:mm:ss")
                ),
                datasets: [
                    {
                        label: "مقدار گزارش شده",
                        data: metrics.map((metric: any) => metric.value),
                        borderColor: "#333",
                        backgroundColor: "#333",
                        tension: 0.3,
                        borderDash: [3],
                    },
                ],
            });

            setLoading(false);
        });
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
                    <Line
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
                    <span>{sensorName}</span>
                    <div className="grid grid-cols-2 gap-8"></div>
                    <div className="flex gap-3"></div>
                </>
            )}
        </div>
    );
}
