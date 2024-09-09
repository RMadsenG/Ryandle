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

    // One frame after start: increment time to start triggering updates
    useEffect(
        () => {
            if (playing) {
                setFineTime(INCREMENT)
            }
        },
        [playing]
    )
    useEffect(
        () => {
            // When stopped, reset bar and stop triggering new updates 
            if (!playing) {
                setFineTime(0)
                return
            }
            // Progress Bar
            var timer = setTimeout(() => { setFineTime(fine_time + INCREMENT) }, 1000 * INCREMENT)
            return () => clearTimeout(timer)
        },
        [fine_time]
    )
    return <>
        <div className="absolute border bg-gray-500 py-1 my-2" style={{ width: (100 * fine_time / MAX_TIME) + "%" }} />
    </>
}
