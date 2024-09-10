import { useEffect, useState } from "react";
import { MAX_TIME } from "./constants";

const INCREMENT = .1


// TODO: Update with setinterval

export default function ProgressBar({ playing, time }: { playing: boolean, time: number }) {
    const [fine_time, setFineTime] = useState<number>(0)

    // Update time to exact.
    useEffect(
        () => {
            setFineTime(time)
        },
        [time]
    )

    useEffect(
        () => {
            if (playing) {
                const timer = setInterval(
                    () => {
                        setFineTime(prev_time => prev_time + INCREMENT)
                    },
                    INCREMENT * 1000
                );
                return () => clearInterval(timer)
            } else {
                setFineTime(0)
            }
        },
        [playing]
    )

    return <>
        <div className="absolute border bg-gray-500 py-1 my-2" style={{ width: (100 * fine_time / MAX_TIME) + "%" }} />
    </>
}
