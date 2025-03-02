import { useState } from 'react'
import Tictactoe from '@/client/components/games/Tictactoe'
import { Props } from '@/models/window'
import OnlyThree from './games/OnlyThree'

export default function TictactoeWindow({ setWindow }: Props) {
  const windowName: string = 'Blank'
  const modes: string[] = ['Tic-Tac-Toe', 'Max 3 Each', 'Super Tic-Tac-Toe']
  const [selected, setSelected] = useState(0)

  function rotate(movement: number) {
    selected + movement === -1
      ? setSelected(modes.length - 1)
      : selected + movement === modes.length
      ? setSelected(0)
      : setSelected(selected + movement)
  }

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
      <div>
        <span className="modes">
          <button onClick={() => rotate(1)}>{`<-`}</button>
          <label>{modes[selected]}</label>
          <button onClick={() => rotate(-1)}>{`->`}</button>
        </span>
        {modes[selected] === 'Tic-Tac-Toe' && <Tictactoe />}
        {modes[selected] === 'Max 3 Each' && <OnlyThree />}
        {/* {modes[selected] === 'Super Tic-Tac-Toe'} */}
      </div>
    </div>
  )
}
