'use client'
import { observer } from "mobx-react-lite"
const Querty = ({game}) => {
  const qwerty = ['qwertyuiop','asdfghjkl','zxcvbnm']
  return (
    <div>
      {
        qwerty.map((row)=>(
          <div className='flex items-center justify-center'>
            {
              row.split("").map((key)=>{

                const bgColor = game.exactGuesses.includes(key)
                ?'bg-green-400'
                :game.inExactGuesses.includes(key)
                ?'bg-yellow-400'
                :game.allGuesses.includes(key)
                ?'bg-gray-900'
                :'bg-gray-200'
                return(
                  <div className={`flex h-10 w-10 items-center justify-center rounded-md m-1 ${bgColor} ${bgColor==='bg-gray-900'? 'text-white':'text-black'}`}>
                    {key}
                  </div>
                )
              })
            }
          </div>
        ))
      }
    </div>
  )
}

export default observer(Querty)
