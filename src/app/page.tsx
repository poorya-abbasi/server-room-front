"use client";
import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useSensorsData from "@/hooks/useSensorsData";
import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/Card";
import useStatsData from "@/hooks/useStatsData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    const [sensorsChartData, setSensorsChartData] = useState<any>();
    const [sensorsData, setSensorsData] = useState<any>();
    const [stats, setStats] = useState<any>();
    const [statsChartData, setStatsChartData] = useState<any>();
    const requests = [useSensorsData(), useStatsData()];

    useEffect(() => {
        Promise.all(requests).then((res: Array<any>) => {
            setSensorsData(res[0].raw);
            setSensorsChartData(res[0].chart);
            setStats(res[1].raw);
            setStatsChartData(res[1].chart);
        });
    }, []);
    return (
        <main>
            <div className="grid grid-cols-2 gap-8 justify-items-center">
                {sensorsData && <DashboardCard value={sensorsData.length} title="سنسور آنلاین" />}
                {stats && (
                    <DashboardCard
                        value={stats.electric + stats.condition + stats.event}
                        title="داده ثبت شده"
                    />
                )}
                {sensorsChartData && (
                    <DashboardCard>
                        <div className="flex flex-col items-center gap-4  w-max">
                            <div className="h-64 w-64">
                                <Doughnut
                                    data={sensorsChartData}
                                    options={{
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                            </div>
                            <span className="font-semibold">سنسور ها</span>
                        </div>
                    </DashboardCard>
                )}
                {statsChartData && (
                    <DashboardCard>
                        <div className="flex flex-col items-center gap-4  w-max">
                            <div className="h-64 w-64">
                                <Doughnut
                                    data={statsChartData}
                                    options={{
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                            </div>
                            <span className="font-semibold">داده ها</span>
                        </div>
                    </DashboardCard>
                )}
            </div>
        </main>
    );
}
