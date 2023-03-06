"use client";

import DataGrid from "@/components/DataGrid";
import useSensorsData from "@/hooks/useSensorsData";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function SensorsPage() {
    const [sensors, setSensors] = useState<any>([]);
    useEffect(() => {
        const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
        instance.get(`/sensors`).then(({ data }) => {
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
            setSensors({ chart: full, raw: data });
        });
    }, []);
    const filters = [
        {
            title: "الکتریکی",
            value: "electric",
        },
        {
            title: "وضعیت",
            value: "condition",
        },
        {
            title: "رخداد",
            value: "event",
        },
    ];

    const [appliedFilter, setAppliedFilter] = useState<string | undefined>();

    const applyFilter = async (value: string) => {
        if (appliedFilter === value) {
            setAppliedFilter(undefined);
            const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
            instance.get(`/sensors`).then(({ data }) => {
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
                setSensors({ chart: full, raw: data });
            });
        } else {
            setAppliedFilter(value);
            const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
            instance.get(`/sensors?type=${value}`).then(({ data }) => {
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
                setSensors({ chart: full, raw: data });
            });
        }
    };

    const typeMutator = (value: string) => {
        switch (value) {
            case "electric":
                return "الکتریکی";
            case "condition":
                return "شرایط";
            case "event":
                return "رخداد";
        }
    };
    return (
        <main className="flex flex-col ">
            <div className="flex gap-2">
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
            </div>
            {!sensors || !sensors.raw ? (
                <Loading />
            ) : (
                <DataGrid
                    columns={[
                        { key: "name", title: "عنوان سنسور" },
                        { key: "type", title: "نوع سنسور" },
                    ]}
                    data={sensors.raw}
                    mutators={{ type: typeMutator }}
                    actions={[
                        {
                            title: "نمایش",
                            href: "/sensors/[id]",
                        },
                        {
                            title: "ویرایش",
                            href: "/sensors/[id]/edit",
                        },
                    ]}
                />
            )}
        </main>
    );
}
