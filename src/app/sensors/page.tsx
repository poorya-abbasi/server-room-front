import DataGrid from "@/components/DataGrid";
import useSensorsData from "@/hooks/useSensorsData";

export default async function SensorsPage() {
    const sensors: any = await useSensorsData();
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
        <main>
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
        </main>
    );
}
