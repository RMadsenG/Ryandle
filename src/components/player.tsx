import { MutableRefObject, RefObject } from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({ playerRef, url, playing, onReady, onProgress }: { playerRef: RefObject<ReactPlayer>, url: string, playing: boolean, onReady: () => void, onProgress: (e: { playedSeconds: number }) => void }) {
    return <ReactPlayer url={"https://soundcloud.com" + url}
        ref={playerRef}
        playing={playing}
        width={"100%"}
        height={"100%"}
        className='player'
        onReady={onReady}
        onProgress={onProgress}
        config={{
            soundcloud: {
                options: {
                    hide_related: true,
                    show_teaser: false,
                }
            }
        }}
    />
}
