import getRandomNumber from '@/client/hooks/getRandomNumber'
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
    setActiveBoard(9)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
    setWinState(false)
  }

  function checkWin(outBoard: number[]): boolean {
    for (let i = 0; i < winStates.length; i++) {
      if (
        outBoard[winStates[i][0]] === turn &&
        outBoard[winStates[i][1]] === turn &&
        outBoard[winStates[i][2]] === turn
      ) {
        setWinState(true)
        setActiveBoard(-1)
        return true
      }
    }
    return false
  }

  function checkActiveBoard(nextBoard: number) {
    board[nextBoard] === 2 ? setActiveBoard(nextBoard) : setActiveBoard(9)
  }

  return (
    <>
      <div className="tictactoe-game">
        <div className="tictactoe-contianer">
          {board.map((state, i) => (
            <MiniTictactoe
              state={state}
              activeBoard={activeBoard}
              checkActiveBoard={checkActiveBoard}
              currentBoard={i}
              turn={turn}
              setTurn={setTurn}
              checkWin={checkWin}
              setMainBoard={setBoard}
              mainBoard={board}
              reseted={reseted}
              winState={winState}
              key={i}
            />
          ))}
        </div>
        <div className="tictactoe-info-container">
          <label className="tictactoe-info" id="turn">{`It's ${
            turn === 0 ? 'O' : 'X'
          }'s Turn`}</label>
          <button className="tictactoe-info" id="reset" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}
