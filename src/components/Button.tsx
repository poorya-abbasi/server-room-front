type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "primary" | "secondary";
};
export default function Button({ children, onClick, type }: Props) {
    const classCollections = () => {
        switch (type) {
            case "secondary":
                return "bg-transparent  border-primary hover:bg-gray-200 focus:ring-primary text-primary py-2 px-3.5";
            default:
                return "bg-primary hover:bg-primaryLight focus:ring-primary text-white px-5 py-[6px]";
        }
    };
    return (
        <button
            onClick={onClick}
            type="button"
            className={`w-max inline-flex items-center rounded-md border border-transparent text-base font-medium  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 ${classCollections()}`}
        >
            {children}
        </button>
    );
}
