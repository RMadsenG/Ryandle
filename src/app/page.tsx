'use client'

import { Values, Guess } from "@/components/boxes";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { OPTIONS, GUESSES, TIMES, MAX_TIME } from "@/components/constants"
const Player = dynamic(() => import("../components/player"), { ssr: false });
import ReactPlayer from 'react-player';

enum GameState {
  Playing,
  Win,
  Lose,
}


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
  let player = useRef<ReactPlayer>(null)
  let [ready, setReady] = useState<boolean>(false)
  let [game_state, setGameState] = useState<GameState>(GameState.Playing)
  let [guesses, setGuessList] = useState<(string | null)[]>([]);
  let [playing, setPlaying] = useState<boolean>(false);
  let [current_guess, setGuess] = useState<string>("");
  let guess_boxes = []
  let end_message = null

  function play_section() {
    if (playing || !ready) {
      return
    }
    player.current?.seekTo(0)
    setPlaying(true);
    setTimeout(() => { setPlaying(false) }, 1000 * (TIMES[guesses.length]))
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

  if (game_state == GameState.Lose) {
    end_message = "Better Luck Next Time :("
  } else if (game_state == GameState.Win) {
    end_message = "Yay"
  }

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
      <div className="p-3 max-w-screen-sm h-full mx-auto flex flex-col justify-between">
        <div id="body">
          <div hidden={game_state !== GameState.Playing}>
            {guess_boxes}
          </div>
          <div className="flex justify-center">
            <div hidden={game_state == GameState.Playing} className="wrapper" style={{ width: "80%" }} >
              <Player url={CORRECT['url']} playerRef={player} playing={playing} onReady={() => setReady(true)} />
            </div>
          </div>
        </div>
        <div hidden={game_state == GameState.Playing} id="result" className="text-center">
          <div className="p-2">
            {end_message}
          </div>
          <button className={"border-2 rounded-lg py-2 px-5 " +
            (game_state == GameState.Win ? Values.Correct : Values.Wrong)}>Share</button>
        </div>
        <div id="footer">
          <div className="flex justify-center">
            <button onClick={play_section} className="border-2 rounded-lg py-2 px-5">Play</button>
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