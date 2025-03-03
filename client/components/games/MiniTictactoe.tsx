import { useEffect, useState } from 'react'
import winStates from '@/client/data/tictactoe.json'
import { SuperProps } from '@/models/window'

export default function MiniTictactoe({
  state,
  currentBoard,
  activeBoard,
  checkActiveBoard,
  turn,
  setTurn,
  checkWin,
  setMainBoard,
  mainBoard,
  reseted,
  winState,
}: SuperProps) {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [board, setBoard] = useState(cleanBoard)

  useEffect(() => {
    setBoard(cleanBoard)
  }, [reseted])

  function makeMove(i: number) {
    const play = [...board]
    let win = winState
    play[i] = turn
    setBoard(play)
    checkActiveBoard(i)
    console.log(activeBoard, mainBoard)
    for (let i = 0; i < winStates.length; i++) {
      if (
        play[winStates[i][0]] === turn &&
        play[winStates[i][1]] === turn &&
        play[winStates[i][2]] === turn
      ) {
        let outBoard = [...mainBoard]
        outBoard[currentBoard] = turn
        setMainBoard(outBoard)
        win = checkWin(outBoard)
      }
    }
    !win && switchTurn()
  }

  function switchTurn() {
    turn === 0 ? setTurn(1) : setTurn(0)
  }

  return (
    <>
      <div
        className={`super-tictactoe-contianer`}
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
              onClick={() =>
                (activeBoard === currentBoard || activeBoard === 9) &&
                cell === 2 &&
                state === 2 &&
                makeMove(i)
              }
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
