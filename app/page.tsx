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
      <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400">Worldle</h1>
      
      {game.guesses.map((_,i)=>(
        <Guess key={i} word={game.word} guess={game.guesses[i]} isGuessed={i<game.currentGuess}/>

        ))
      }
      {game.won && <h1>You won!</h1>}
      {game.lost && <h1>You Lost!</h1>}

      <Querty/>
      word:{game.word}
      myGuess:{JSON.stringify(game.guesses)}
    </div>
  );
})
