import { useState } from 'react'
import Tictactoe from '@/client/components/application 1/Tictactoe'

export default function Window() {
  const windowName = 'Blank'

  return (
    <div className="window" id={windowName}>
      <span className="window-tab">
        <label className="window-name" draggable={true}>
          {windowName}
        </label>
        <button className="window-buttons">_</button>
        <button className="window-buttons">O</button>
        <button className="window-buttons">X</button>
      </span>
      <Tictactoe />
    </div>
  )
}
