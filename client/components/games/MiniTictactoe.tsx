import getRandomNumber from '@/client/components/hooks/getRandomNumber'
import { useEffect, useState } from 'react'
import winStates from '@/client/data/tictactoe.json'
import { SuperProps } from '@/models/window'

export default function MiniTictactoe({
  state,
  currentBoard,
  activeBoard,
  setActiveBoard,
  turn,
  setTurn,
  setWinState,
  setMainBoard,
  mainBoard,
  reseted,
}: SuperProps) {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [board, setBoard] = useState(cleanBoard)

  useEffect(() => {
    reset()
  }, [reseted])

  // randomise starting player at the start of every game
  function reset() {
    setBoard(cleanBoard)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
    setWinState(false)
  }

  function makeMove(i: number) {
    const play = [...board]
    play[i] = turn
    setBoard(play)
    for (let i = 0; i < winStates.length; i++) {
      if (
        play[winStates[i][0]] === turn &&
        play[winStates[i][1]] === turn &&
        play[winStates[i][2]] === turn
      ) {
        let outBoard = [...mainBoard]
        outBoard[currentBoard] = turn
        setMainBoard(outBoard)
      }
    }
    switchTurn()
  }

  function switchTurn() {
    turn === 0 ? setTurn(1) : setTurn(0)
  }

  return (
    <>
      <div
        className={`super-tictactoe-contianer ${
          currentBoard % 2 === 0 && 'offset-games'
        }`}
        id={`${
          state === 0
            ? 'knots-win'
            : state === 1
            ? 'cross-win'
            : activeBoard === currentBoard
            ? 'active-board'
            : currentBoard % 2 == 0
            ? 'offset-games'
            : ''
        }`}
      >
        {board.map((cell, i) => {
          return (
            <button
              className={`tictactoe`}
              id={cell === 0 ? 'O' : 'X'}
              key={i}
              onClick={() => cell === 2 && state == 2 && makeMove(i)}
            >
              <p className="abril-fatface-regular small-font">
                {cell === 0 ? 'O' : cell === 1 ? 'X' : ''}
              </p>
            </button>
          )
        })}
      </div>
    </>
  )
}
