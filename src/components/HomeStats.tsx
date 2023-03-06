"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DashboardCard from "./dashboard/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    sensorsData: any;
    stats: any;
    sensorsChartData: any;
    statsChartData: any;
};

export default function HomeStats({ sensorsData, stats, sensorsChartData, statsChartData }: Props) {
    return (
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
    );
}
