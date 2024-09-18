'use client'
import { useLocalObservable, observer } from "mobx-react-lite";
import Guess from "./components/Guess";
import Querty from "./components/Querty";
import Game from "@/stores/PuzzleStore";
import { useEffect } from "react";

export default observer(function Home() {
  const game = useLocalObservable(()=> Game)
  useEffect(()=>{
    game.init()
    window.addEventListener('keyup', game.handleKeyUp)

    return ()=>{
      window.removeEventListener('keyup', game.handleKeyUp)
    }
  },[])
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-600 items-center justify-center">
      <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400 mb-4">Worldle</h1>

      {/* ['ghost, ready, world] */}
      {game.guesses.map((_,i)=>(
        <Guess key={i} word={game.word} guess={game.guesses[i]} isGuessed={i<game.currentGuess}/>

        ))
      }
      {game.won && (
        <div className="bg-green-500 text-white font-bold text-xl py-4 px-6 rounded-lg text-center mt-4">
          You won!
        </div>
      )}
      {game.lost && (
        <div className="my-3 text-white border rounded-lg bg-red-500 py-4 px-6 text-center mt-4">
          You lost, try again. The word was: {game.word}
        </div>
      )}

      <button className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-bold my-3" onClick={game.init}>Play Again</button>

      <Querty game={game}/>
    </div>
  );
})
