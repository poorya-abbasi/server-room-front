type Props = {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: string;
};
export default function Textfield({ label, placeholder, type, value, onChange }: Props) {
    return (
        <div className="max-w-xl">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type ? type : "text"}
                    name={label}
                    id={label}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={placeholder || "Enter your input here"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
