"use client";
import Loading from "@/app/loading";
import Button from "@/components/Button";
import Textfield from "@/components/Textfield";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSensor({ params }: any) {
    const [sensor, setSensor] = useState<Sensor>();
    const [loading, setLoading] = useState(true);
    const instance = useAxios();
    const router = useRouter();
    useEffect(() => {
        instance.get(`/sensors/${params.id}`).then((res) => {
            setSensor(res.data);
            setLoading(false);
        });
    }, []);

    const submit = async () => {
        setLoading(true);
        instance
            .put(`/sensors/${params.id}`, sensor)
            .then((res) => {
                goBack();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const goBack = () => {
        router.back();
    };
    return (
        <div className="flex flex-col gap-8">
            {loading || !sensor ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-8">
                        <Textfield
                            label="عنوان"
                            placeholder="عنوان سنسور"
                            value={sensor.name}
                            onChange={(val) => setSensor({ ...sensor, name: val })}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={goBack} type="secondary">
                            بازگشت
                        </Button>
                        <Button onClick={submit}>ذخیره</Button>
                    </div>
                </>
            )}
        </div>
    );
}
