"use client";

import ScatterChart from "@/components/ScatterChart";

export default function Reports() {
    return (
        <div className="px-48">
            <ScatterChart
                ids={[
                    "c10cb7ed-238c-44a7-8559-f3f38392aab6",
                    "1f2e6893-8763-4b94-ab21-a0dd55b4b4da",
                ]}
                title={"نمودار پراکندگی دما به رطوبت"}
            />

            <ScatterChart
                ids={[
                    "3634105d-8596-4261-a895-8a34c39a7133",
                    "b8025646-99d7-44cc-acc0-a4830e2cc752",
                ]}
                title={"نمودار پراکندگی ولتاژ به جریان"}
            />

            <ScatterChart
                ids={[
                    "1f2e6893-8763-4b94-ab21-a0dd55b4b4da",
                    "f348b0d7-0b56-4823-883e-5007a78b187d",
                ]}
                title={"نمودار پراکندگی رطوبت به گرد و خاک"}
            />
        </div>
    );
}
