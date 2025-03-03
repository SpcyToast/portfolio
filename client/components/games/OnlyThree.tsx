import getRandomNumber from '@/client/components/hooks/getRandomNumber'
import { useEffect, useState } from 'react'
import winStates from '@/client/data/tictactoe.json'
import { TictactoeProps } from '@/models/window'

export default function OnlyThree({
  setTurn,
  setWinState,
  winState,
  turn,
}: TictactoeProps) {
  const cleanBoard: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2]
  const cleanTurns: number[] = [9, 9, 9]
  const [board, setBoard] = useState(cleanBoard)
  const [x, setX] = useState(cleanTurns)
  const [o, setO] = useState(cleanTurns)

  useEffect(() => {
    reset()
  }, [])

  // randomise starting player at the start of every game
  function reset() {
    setBoard(cleanBoard)
    setO(cleanTurns)
    setX(cleanTurns)
    const start = getRandomNumber(0, 1)
    start === 0 ? setTurn(0) : setTurn(1)
    setWinState(false)
  }

  function makeMove(i: number) {
    let play: number[] = cleanTurns
    let newBoard = [...cleanBoard, 0]
    let switchable = true
    turn === 0 ? (play = [...o]) : (play = [...x])
    play.pop()
    play.unshift(i)

    turn === 0 ? setO(play) : setX(play)
    for (let j = 0; j < 3; j++) {
      newBoard[play[j] as number] = turn
      turn === 0
        ? (newBoard[x[j] as number] = 1)
        : (newBoard[o[j] as number] = 0)
    }
    newBoard.pop()
    setBoard(newBoard)
    for (let i = 0; i < winStates.length; i++) {
      if (
        newBoard[winStates[i][0]] === turn &&
        newBoard[winStates[i][1]] === turn &&
        newBoard[winStates[i][2]] === turn
      ) {
        setWinState(true)
        switchable = false
        turn === 0 ? setO(cleanTurns) : setX(cleanTurns)
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
              id={cell === 0 ? 'O' : 'X'}
              key={i}
              onClick={() => cell === 2 && !winState && makeMove(i)}
            >
              <p
                className="abril-fatface-regular"
                id={
                  turn === 0
                    ? o[2] === i
                      ? 'last'
                      : ''
                    : x[2] === i
                    ? 'last'
                    : ''
                }
              >
                {cell === 0 ? 'O' : cell === 1 ? 'X' : ''}
              </p>
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
