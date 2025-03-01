import { useState } from 'react'

export default function Tictactoe() {
  const cleanBoard: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const [board, setBoard] = useState(cleanBoard)

  return (
    <div className="tictactoe-contianer">
      {board.map((cell, i) => {
        return (
          <button className={`item ${'item-' + (i + 1)}} tictactoe`} key={i}>
            {cell === 1 ? 'O' : cell === 2 ? 'X' : 'Testing'}{' '}
          </button>
        )
      })}
    </div>
  )
}
