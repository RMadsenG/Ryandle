'use client'

import { Values, Guess } from "@/components/boxes";
import dynamic from "next/dynamic";
import { useState } from "react";
import { OPTIONS } from "@/components/constants"
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

enum GameState {
  Playing,
  Win,
  Lose,
}

const GUESSES = 6;

const NAMES = OPTIONS.map(e => e['name'])
const URLS = OPTIONS.map(e => e['url'])
const DATALIST = NAMES.map((e, i) => <option key={i} value={e} />)

const TODAY = new Date()
TODAY.setHours(0)
TODAY.setMinutes(0)
TODAY.setSeconds(0)
TODAY.setMilliseconds(0)
const CORRECT = OPTIONS[Math.floor(TODAY.getTime() / 1000 / 60 / 60 / 24 % OPTIONS.length)]
console.log(CORRECT);


export default function Home() {
  let [game_state, setGameState] = useState<GameState>(GameState.Playing)
  let [guesses, setGuessList] = useState<(string | null)[]>([]);
  let [playing, setPlaying] = useState<boolean>(false);
  let [current_guess, setGuess] = useState<string>("");
  let guess_boxes = []

  function toggle() {
    setPlaying(!playing);
  }
  function make_guess() {
    if (!NAMES.includes(current_guess)) {
      return
    }
    guesses.push(current_guess)
    setGuessList([...guesses])

    if (guesses.length >= GUESSES) {
      setGameState(GameState.Lose)
      return
    }
    if (current_guess == CORRECT['name']) {
      setGameState(GameState.Win)
    }
  }
  function skip() {
    guesses.push(null)
    setGuessList([...guesses])

    if (guesses.length >= GUESSES) {
      setGameState(GameState.Lose)
      return
    }
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
    } else if (guesses[i] == CORRECT['name']) {
      color = Values.Correct
    }
    guess_boxes.push(<Guess key={i} text={guesses[i]} value={color} />)
  }
  return (
    <main className="grow">
      <div className="p-3 max-w-screen-sm h-full mx-auto flex flex-col">
        <div id="body" className="grow">
          <div hidden={game_state !== GameState.Playing}>
            {guess_boxes}
          </div>
          <div className="flex justify-center">
            <div hidden={game_state == GameState.Playing} className="wrapper" style={{ width: "80%" }} >
              <ReactPlayer url={"https://soundcloud.com" + CORRECT['url']}
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
        <div id="footer">
          <div className="flex justify-center">
            <button className="border-2 rounded-lg py-2 px-5">Play</button>
          </div>
          <input onChange={(e) => setGuess(e.target.value)} value={current_guess} list="songlist" className={"w-full border-2 p-2 my-2 " + Values.Current} />
          <datalist id="songlist" >
            {DATALIST}
          </datalist>
          <div id="selection-controls" className="flex justify-between">
            <button onClick={skip} className={"border-2 rounded-lg py-2 px-5 " + Values.Skipped}>Skip</button>
            <button onClick={make_guess} className={"border-2 rounded-lg py-2 px-5 " + Values.Correct}>Submit</button>
          </div>
        </div>
      </div>
    </main>
  );
}