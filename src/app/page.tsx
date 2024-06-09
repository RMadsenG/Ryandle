'use client'

import { Values, Guess } from "@/components/boxes";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const GUESSES = 6;

export default function Home() {
  let [guesses, setGuess] = useState<string[]>([]);
  let [playing, setPlaying] = useState<boolean>(false);
  let guess_boxes = []
  function toggle() {
    setPlaying(!playing);
  }
  for (var i = 0; i < GUESSES; i++) {
    var color = [Values.Skipped, Values.Wrong, Values.Correct, Values.Current, Values.Next]
    guess_boxes.push(<Guess key={i} text={guesses[i]} value={color[i % 5]} />)
  }
  return (
    <main className="max-w-screen-sm mx-auto">
      <div className="p-3">

        {guess_boxes}
        <input className={"w-full border-2 p-2 mb-2 " + Values.Current} />
        <div className="justify-evenly flex">
          <div>
            Hello
          </div> <div>
            Hello
          </div> <div>
            Hello
          </div>
        </div>
        <div contentEditable="true" className={"border-2 p-2 mb-2 " + Values.Current} />
      </div>
      <div className="flex justify-center">
        <div hidden={true} style={{ width: "80%" }} className="">
          <div className="wrapper">
            <ReactPlayer url={"https://api.soundcloud.com/tracks/204399998"}
              playing={playing}
              width={"100%"}
              height={"100%"}
              className='player'
              config={{
                soundcloud: {
                  options: {
                    hide_related: true,
                    show_teaser: false,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>


    </main>
  );
}