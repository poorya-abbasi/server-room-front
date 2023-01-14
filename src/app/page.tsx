import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div className="text-2xl text-gray-600 font-bold">Welcome</div>
        </main>
    );
}
