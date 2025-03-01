import { useState } from 'react'
import Tictactoe from '@/client/components/games/Tictactoe'
import { Props } from '@/models/window'

export default function TictactoeWindow({ setWindow }: Props) {
  const windowName = 'Blank'

  return (
    <div className="window" id={windowName}>
      <span className="window-tab">
        <label className="window-name" draggable={true}>
          {windowName}
        </label>
        <button className="window-buttons">_</button>
        <button className="window-buttons">O</button>
        <button className="window-buttons" onClick={() => setWindow(false)}>
          X
        </button>
      </span>
      <Tictactoe />
    </div>
  )
}
