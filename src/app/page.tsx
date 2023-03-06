import Image from "next/image";
import useSensorsData from "@/hooks/useSensorsData";
import DashboardCard from "@/components/dashboard/Card";
import useStatsData from "@/hooks/useStatsData";
import HomeStats from "@/components/HomeStats";

type Response = {
    raw: any;
    chart: any;
};

export default async function Home() {
    const res: Response[] = [
        (await useSensorsData()) as Response,
        (await useStatsData()) as Response,
    ];
    const sensorsData = res[0].raw;
    const sensorsChartData = res[0].chart;
    const stats = res[1].raw;
    const statsChartData = res[1].chart;

    return (
        <main>
            <HomeStats
                sensorsData={sensorsData}
                sensorsChartData={sensorsChartData}
                stats={stats}
                statsChartData={statsChartData}
            />
        </main>
    );
}
