import { useState } from 'react'

export default function Tictactoe() {
  const cleanBoard: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [board, setBoard] = useState(cleanBoard)

  return (
    <div className="tictactoe-container">
      {board.map((cell) => {
        return (
          <div className="tictactoe">
            <button className="cell">
              {cell === 1 ? 'O' : cell === 2 ? 'X' : 'Testing'}{' '}
            </button>
          </div>
        )
      })}
    </div>
  )
}
