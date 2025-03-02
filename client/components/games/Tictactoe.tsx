import getRandomNumber from '@/client/components/hooks/getRandomNumber'
import { useEffect, useState } from 'react'
import winStates from '@/client/data/tictactoe.json'
import { TictactoeProps } from '@/models/window'

export default function Tictactoe({
  setTurn,
  setWinState,
  winState,
  turn,
}: TictactoeProps) {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [board, setBoard] = useState(cleanBoard)

  useEffect(() => {
    reset()
  }, [])

  // randomise starting player at the start of every game
  function reset() {
    setBoard(cleanBoard)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
    setWinState(false)
  }

  function makeMove(i: number) {
    const play = [...board]
    let switchable = true
    play[i] = turn
    setBoard(play)
    for (let i = 0; i < winStates.length; i++) {
      if (
        play[winStates[i][0]] === turn &&
        play[winStates[i][1]] === turn &&
        play[winStates[i][2]] === turn
      ) {
        setWinState(true)
        switchable = false
      }
    }
    switchable && switchTurn()
  }

  function switchTurn() {
    turn === 0 ? setTurn(1) : setTurn(0)
  }

  return (
    <>
      <div className="tictactoe-contianer">
        {board.map((cell, i) => {
          return (
            <button
              className={`tictactoe`}
              key={i}
              onClick={() => cell === 2 && !winState && makeMove(i)}
            >
              {cell === 0 ? 'O' : cell === 1 ? 'X' : ''}
            </button>
          )
        })}
        <label className="tictactoe-info" id="turn">{`It's ${
          turn === 0 ? 'O' : 'X'
        }'s Turn`}</label>
        <button className="tictactoe-info" id="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </>
  )
}
