import { RefObject, useEffect, useState } from "react";
import { MAX_TIME } from "./constants";
import ReactPlayer from "react-player";

const INCREMENT = .1

export default function ProgressBar({ playing, time }: { playing: boolean, time: number }) {
    const [fine_time, setFineTime] = useState<number>(0)

    useEffect(
        () => {
            setFineTime(time)
        },
        [time]
    )
    useEffect(

        () => {
            if (!playing) {
                return
            }
            var timer = setTimeout(() => {
                setFineTime(fine_time + INCREMENT)
            },
                1000 * INCREMENT)
            return () => clearTimeout(timer)
        },
        [fine_time]
    )
    return <>
        <div className="absolute border bg-gray-500 py-1 my-2" style={{ width: (100 * fine_time / MAX_TIME) + "%" }} />
    </>
}
