import getRandomNumber from '@/client/getRandomNumber'
import { useEffect, useState } from 'react'

export default function Tictactoe() {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [board, setBoard] = useState(cleanBoard)
  const [turn, setTurn] = useState(2)
  const [winState, setWinState] = useState(false)

  useEffect(() => {
    reset()
  }, [])
  
  // randomise starting player at the start of every game
  function reset() {
    setBoard(cleanBoard)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
  }

  function makeMove(i: number) {
    const play = [...board]
    play[i] = turn
    setBoard(play)
    console.log(play)
    switchTurn()
  }

  function switchTurn() {
    turn === 0 ? setTurn(1) : setTurn(0)
  }

  return (
    <div className="tictactoe-contianer">
      {board.map((cell, i) => {
        return (
          <button
            className={`item ${'item-' + (i + 1)}} tictactoe`}
            key={i}
            onClick={() => cell === 2 && makeMove(i)}
          >
            {cell === 0 ? 'O' : cell === 1 ? 'X' : 'Testing'}{' '}
          </button>
        )
      })}
      <label className="tictactoe-info">{`It's ${
        turn === 0 ? 'O' : 'X'
      }'s Turn`}</label>
      <button className="tictactoe-info" onClick={() => reset()}>
        Reset
      </button>
    </div>
  )
}
