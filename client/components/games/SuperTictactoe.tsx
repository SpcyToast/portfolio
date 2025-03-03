import getRandomNumber from '@/client/components/hooks/getRandomNumber'
import { useEffect, useState } from 'react'
import winStates from '@/client/data/tictactoe.json'
import { TictactoeProps } from '@/models/window'
import MiniTictactoe from './MiniTictactoe'

export default function SuperTictactoe({
  setTurn,
  setWinState,
  winState,
  turn,
}: TictactoeProps) {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [board, setBoard] = useState(cleanBoard)
  const [activeBoard, setActiveBoard] = useState(9)
  const [reseted, setReseted] = useState(false)

  useEffect(() => {
    reset()
  }, [])

  // randomise starting player at the start of every game
  function reset() {
    setReseted(!reseted)
    setBoard(cleanBoard)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
    setWinState(false)
  }

  function checkWin(outBoard: number[]) {
    for (let i = 0; i < winStates.length; i++) {
      if (
        outBoard[winStates[i][0]] === turn &&
        outBoard[winStates[i][1]] === turn &&
        outBoard[winStates[i][2]] === turn
      ) {
        setWinState(true)
        setActiveBoard(-1)
      }
    }
  }

  return (
    <>
      <div className="tictactoe-contianer">
        {board.map((state, i) => (
          <MiniTictactoe
            state={state}
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
            currentBoard={i}
            turn={turn}
            setTurn={setTurn}
            checkWin={checkWin}
            setMainBoard={setBoard}
            mainBoard={board}
            reseted={reseted}
            key={i}
          />
        ))}
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
