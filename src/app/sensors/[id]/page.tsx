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

export default function EditSensor({ params }: any) {
    const [sensor, setSensor] = useState<any>();
    const [sensorType, setSensorType] = useState<string>();
    const [sensorName, setSensorName] = useState<string>();
    const [loading, setLoading] = useState(true);
    const instance = useAxios();
    const router = useRouter();

    const filters = [
        {
            title: "هفته اخیر",
            value: "week",
        },
        {
            title: "ماه گذشته",
            value: "month",
        },
        {
            title: "۶ ماه گذشته",
            value: "6months",
        },
        {
            title: "سال گذشته",
            value: "year",
        },
    ];

    const [appliedFilter, setAppliedFilter] = useState<string | undefined>();

    const applyFilter = async (value: string) => {
        if (appliedFilter === value) {
            setAppliedFilter(undefined);
            getSensorData();
        } else {
            setAppliedFilter(value);
            getSensorData(value);
        }
    };

    const getSensorData = (filter?: string) => {
        instance.get(`/sensors/${params.id}${filter ? "?filter=" + filter : ""}`).then((res) => {
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
                    <div className="flex gap-2 self-start">
                        {filters.map((item) => (
                            <div
                                key={item.value}
                                className={`border border-gray-500 rounded-full py-1.5 cursor-pointer px-4 text-sm font-medium ${
                                    appliedFilter === item.value ? "bg-gray-600 text-white" : ""
                                }`}
                                onClick={() => applyFilter(item.value)}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>{" "}
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
