type Props = {
    value?: number;
    title?: string;
    children?: React.ReactNode;
};

export default function DashboardCard({ value, title, children }: Props) {
    return (
        <div className="flex flex-col items-center gap-6 border border-gray-300 rounded-xl w-full justify-center p-8">
            {value && <span className="text-4xl">{value}</span>}
            {title && <span className="text-2xl font-bold">{title}</span>}
            {children && <div className="">{children}</div>}
        </div>
    );
}
