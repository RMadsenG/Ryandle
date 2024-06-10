'use client'

import { Values, Guess } from "@/components/boxes";
import dynamic from "next/dynamic";
import { useState } from "react";
import { OPTIONS } from "@/components/constants"
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const GUESSES = 6;

const CORRECT = 'aa - 11'

let options = OPTIONS.map((e, i) => <option key={i} value={e} />)

export default function Home() {
  let [guesses, setGuessList] = useState<(string | null)[]>([]);
  let [playing, setPlaying] = useState<boolean>(false);
  let [current_guess, setGuess] = useState<string>("");
  let guess_boxes = []

  function toggle() {
    setPlaying(!playing);
  }

  function make_guess() {
    console.log(current_guess);

    if (!OPTIONS.includes(current_guess)) {
      return
    }
    console.log(guesses.length);

    if (guesses.length == GUESSES) {
      console.log("Bruh");

      setGuessList([])
      return
    }
    console.log(current_guess);

    setGuessList([...guesses, current_guess])
  }
  function skip() {
    if (guesses.length == GUESSES) {
      console.log("Bruh");

      setGuessList([])
      return
    }
    setGuessList([...guesses, null])
  }

  console.log("generation " + guesses)
  for (var i = 0; i < GUESSES; i++) {
    var color = Values.Wrong
    if (i == guesses.length) {
      color = Values.Current
    } else if (i > guesses.length) {
      color = Values.Next
    } else if (!guesses[i]) {
      color = Values.Skipped
    } else if (guesses[i] == CORRECT) {
      color = Values.Correct
    }
    guess_boxes.push(<Guess key={i} text={guesses[i]} value={color} />)
  }
  return (
    <main className="grow">
      <div className="p-3 max-w-screen-sm h-full mx-auto flex flex-col">
        <div id="body" className="grow">
          {guess_boxes}
        </div>
        <div id="footer">
          <div className="flex justify-center">
            <button className="border-2 rounded-lg py-2 px-5">Play</button>
          </div>
          <input onChange={(e) => setGuess(e.target.value)} value={current_guess} list="songlist" className={"w-full border-2 p-2 my-2 " + Values.Current} />

          <datalist id="songlist" >
            {options}
          </datalist>
          <div id="selection-controls" className="flex justify-between">
            <button onClick={skip} className={"border-2 rounded-lg py-2 px-5 " + Values.Skipped}>Skip</button>
            <button onClick={make_guess} className={"border-2 rounded-lg py-2 px-5 " + Values.Correct}>Submit</button>
          </div>
        </div>
      </div>
      {/*
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
            </div>*/}


    </main>
  );
}