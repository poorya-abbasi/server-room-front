"use client";

import DataGrid from "@/components/DataGrid";
import useSensorsData from "@/hooks/useSensorsData";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function SensorsPage() {
    const [sensors, setSensors] = useState<any>([]);
    useEffect(() => {
        useSensorsData().then((res: any) => setSensors(res));
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
            setSensors(await useSensorsData());
        } else {
            setAppliedFilter(value);
            setSensors(await useSensorsData(value));
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
