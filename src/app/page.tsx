'use client'

import { Values, Guess, ButtonValues } from "@/components/boxes";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { OPTIONS, GUESSES, TIMES, MAX_TIME } from "@/components/constants"
const Player = dynamic(() => import("../components/player"), { ssr: false });
import ReactPlayer from 'react-player';
import ProgressBar from "@/components/progressbar";

enum GameState {
  Playing,
  Win,
  Lose,
}

const BAR_DIVS = TIMES.map((e, i) => <div key={i} className="absolute border border-gray-500 p-1 my-2" style={{ width: (100 * e / MAX_TIME) + '%' }} />)

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

function getCopyText(guesses: string[]) {
  function m(guess: (string | null)) {
    var box = "🟥"
    if (!guess) {
      return "🟦"
    }
    if (guess == CORRECT['name']) {
      return "🟩"
    }
    return box
  }
  let text = `
  Heardle Ryan ${TODAY.getFullYear()}/${TODAY.getMonth()}/${TODAY.getDate()}

  ${guesses.at(-1) == CORRECT['name'] ? "🎉" : "🚫"}${guesses.map(m, guesses).concat(Array<string>(GUESSES - guesses.length).fill('⬛')).join('')}

  #ryaniscool
  
  ${window.location.href}
  `
  navigator.clipboard.writeText(text)
}


export default function Home() {
  let player = useRef<ReactPlayer>(null)
  let [ready, setReady] = useState<boolean>(false)
  let [current_time, setCurrentTime] = useState<number>(0)
  let [game_state, setGameState] = useState<GameState>(GameState.Playing)
  let [guesses, setGuessList] = useState<string[]>([]);
  let [playing, setPlaying] = useState<boolean>(false);
  let [current_guess, setGuess] = useState<string>("");
  let guess_boxes = []
  let end_message = null


  useEffect(() => {
    if (!playing) {
      return
    }
    if (game_state == GameState.Playing) {
      var timer = setTimeout(() => { setPlaying(false) }, 1000 * (TIMES[guesses.length]))
    } else {
      var timer = setTimeout(() => { setPlaying(false) }, MAX_TIME * 1000)
    }
    return () => clearTimeout(timer);
  }, [playing]);


  function play_section() {
    if (!ready) {
      return
    }
    setPlaying(!playing);
  }
  function make_guess() {
    if (!NAMES.includes(current_guess)) {
      return
    }
    guesses.push(current_guess)
    setGuessList([...guesses])

    if (guesses.length >= GUESSES) {
      setPlaying(true)
      setGameState(GameState.Lose)
      return
    }
    if (current_guess == CORRECT['name']) {
      setPlaying(true)
      setGameState(GameState.Win)
    }
  }
  function skip() {
    guesses.push('')
    setGuessList([...guesses])

    if (guesses.length >= GUESSES) {
      setPlaying(true)
      setGameState(GameState.Lose)
      return
    }
  }
  function updateTime(e: { playedSeconds: number }) {
    setCurrentTime(e.playedSeconds)
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
              <Player url={CORRECT['url']} playerRef={player} playing={playing} onReady={() => setReady(true)} onProgress={updateTime} />
            </div>
          </div>
        </div>
        <div hidden={game_state == GameState.Playing} id="result" className="text-center">
          <div className="p-2">
            {end_message}
          </div>
          <button onClick={() => getCopyText(guesses)} className={"border-2 rounded-lg py-2 px-5 " +
            (game_state == GameState.Win ? ButtonValues.Correct : ButtonValues.Wrong)}>Share</button>
        </div>
        <div id="footer">
          <div className="flex justify-center">
            <button onClick={play_section} hidden={!ready} className="border-2 rounded-lg py-2 px-5" >{playing ? "Stop" : "Play"}</button>
          </div>
          <div className="relative flex">
            <div className="w-full border p-1 my-2" />
            {BAR_DIVS}
            <ProgressBar playing={playing} time={current_time} />
          </div>
          <div hidden={game_state != GameState.Playing}>
            <input onChange={(e) => setGuess(e.target.value)} value={current_guess} list="songlist" className={"w-full border-2 p-2 my-1 " + Values.Current} />
            <datalist id="songlist" >
              {DATALIST}
            </datalist>
            <div id="selection-controls" className="flex justify-between">
              <button onClick={skip} className={"border-2 rounded-lg py-2 px-5 " + ButtonValues.Skipped}>Skip</button>
              <button onClick={make_guess} className={"border-2 rounded-lg py-2 px-5 " + ButtonValues.Correct}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}