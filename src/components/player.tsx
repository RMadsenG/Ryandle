import { MutableRefObject, RefObject } from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({
    playerRef,
    url,
    playing,
    onReady,
    onProgress,
    setPlaying
}: {
    playerRef: RefObject<ReactPlayer>,
    url: string,
    playing: boolean,
    onReady: () => void,
    onProgress: (e: { playedSeconds: number }) => void,
    setPlaying: (e: boolean) => void
}) {

    return <ReactPlayer url={"https://soundcloud.com" + url}
        ref={playerRef}
        playing={playing}
        width={"100%"}
        height={"100%"}
        className='player'
        onReady={onReady}
        onPlay={() => setPlaying(true)}
        onPause={() => { playerRef.current?.seekTo(0); setPlaying(false) }}
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
