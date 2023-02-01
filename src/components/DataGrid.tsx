const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
];

type Props = {
    columns: { title: string; key: string }[];
    data: any[];
    mutators?: { [key: string]: (value: any) => any };
    actions?: { title: string; href: string }[];
};

export default function DataGrid({ columns, data, mutators, actions }: Props) {
    const replaceDynamicParams = (href: string, index: number) => {
        const matches = href.match(/\[.*?\]/g);
        if (matches) {
            matches.forEach((match) => {
                const key = match.replace("[", "").replace("]", "");
                href = href.replace(match, data[index][key]);
            });
        }
        return href;
    };
    return (
        <div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={"header-" + column.key}
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                {column.title}
                                            </th>
                                        ))}
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={index % 2 === 0 ? undefined : "bg-gray-50"}
                                        >
                                            {columns.map((column) => (
                                                <td
                                                    key={item.id + " " + column.key}
                                                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                                >
                                                    {mutators && mutators[column.key]
                                                        ? mutators[column.key](item[column.key])
                                                        : item[column.key]}
                                                </td>
                                            ))}

                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex gap-4">
                                                {actions &&
                                                    actions.map((action) => (
                                                        <a
                                                            key={action.title}
                                                            href={replaceDynamicParams(
                                                                action.href,
                                                                index
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            {action.title}
                                                        </a>
                                                    ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
