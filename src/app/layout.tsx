"use client";
import "./globals.css";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    AdjustmentsHorizontalIcon,
    XMarkIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [navigation, setNavigation] = useState([
        { name: "داشبورد", href: "/", icon: HomeIcon, current: false },
        { name: "سنسور ها", href: "/sensors", icon: AdjustmentsHorizontalIcon, current: false },
        { name: "گزارشات", href: "/reports", icon: ChartBarIcon, current: false },
        { name: "پروژه ها", href: "#", icon: FolderIcon, current: false },
        { name: "تقویم", href: "#", icon: CalendarIcon, current: false },
        { name: "مستندات", href: "#", icon: InboxIcon, current: false },
    ]);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        setNavigation(
            navigation.map((i) =>
                i.href === pathname ? { ...i, current: true } : { ...i, current: false }
            )
        );
    }, [pathname]);

    const goBack = () => {
        router.back();
    };

    return (
        <html lang="en" className="h-full bg-gray-100">
            <head />
            <body className="h-full">
                <div className="md:hidden h-screen w-screen bg-gray-800 flex items-center justify-center">
                    <span className="text-white font-semibold text-center px-8">
                        اتاق سرور در حال حاضر تنها در دسکتاپ قابل دسترسی می باشد
                    </span>
                </div>
                <div className="md:block">
                    {/* Static sidebar for desktop */}
                    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:right-0">
                        <div className="flex min-h-0 flex-1 flex-col bg-gray-800 rtl">
                            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                                <div className="flex flex-shrink-0 items-center px-4 text-white font-black tracking-widest">
                                    اتاق سرور
                                </div>
                                <nav className="mt-5 flex-1 space-y-1 px-2 ">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "group gap-3 flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current
                                                        ? "text-gray-300"
                                                        : "text-gray-400 group-hover:text-gray-300",
                                                    " flex-shrink-0 h-6 w-6"
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex flex-shrink-0 bg-gray-700 p-4">
                                <a href="#" className="group block w-full flex-shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <img
                                                className="inline-block h-9 w-9 rounded-full object-cover"
                                                src="https://fararu.com/files/fa/news/1400/8/25/1062273_585.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">
                                                اصغر فرهادی
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                            <button
                                type="button"
                                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex-1 ">
                            <div className="py-6 rtl md:pr-64">
                                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        {!navigation.find((item) => item.current) && (
                                            <div
                                                className="flex items-center gap-1 cursor-pointer"
                                                onClick={goBack}
                                            >
                                                <ChevronRightIcon className="h-8 w-8 text-gray-800 " />
                                                <span className="mt-1">
                                                    {
                                                        navigation.find(
                                                            (item) =>
                                                                pathname?.includes(item.href) &&
                                                                item.href !== "/"
                                                        )?.name
                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {navigation.find((item) => item.current)?.name}
                                    </h1>
                                </div>
                                <div className="p-8">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
