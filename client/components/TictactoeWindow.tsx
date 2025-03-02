import { useState } from 'react'
import Tictactoe from '@/client/components/games/Tictactoe'
import { Props } from '@/models/window'
import OnlyThree from './games/OnlyThree'

export default function TictactoeWindow({ setWindow }: Props) {
  const windowName: string = 'Tic-Tac-Toe'
  const modes: string[] = ['Tic-Tac-Toe', 'Max 3 Each', 'Super Tic-Tac-Toe']
  const [selected, setSelected] = useState(0)
  const [turn, setTurn] = useState(2)
  const [winState, setWinState] = useState(false)

  function rotate(movement: number) {
    selected + movement === -1
      ? setSelected(modes.length - 1)
      : selected + movement === modes.length
      ? setSelected(0)
      : setSelected(selected + movement)
  }

  return (
    <div className="window" id={windowName}>
      <span className="window-info">
        <label className="window-name" draggable={true}>
          {windowName}
        </label>
        <button className="window-buttons">_</button>
        <button className="window-buttons">O</button>
        <button
          className="window-buttons"
          id="last-button"
          onClick={() => setWindow(false)}
        >
          X
        </button>
      </span>
      <div className="content">
        <span className="modes">
          <button onClick={() => rotate(1)}>{`←`}</button>
          <label>{modes[selected]}</label>
          <button onClick={() => rotate(-1)}>{`→`}</button>
        </span>{' '}
        <br />
        {winState && (
          <h1 className="tictactoe-win">{`${turn === 0 ? 'O' : 'X'} Wins!`}</h1>
        )}
        {modes[selected] === 'Tic-Tac-Toe' && (
          <Tictactoe
            setTurn={setTurn}
            setWinState={setWinState}
            turn={turn}
            winState={winState}
          />
        )}
        {modes[selected] === 'Max 3 Each' && (
          <OnlyThree
            setTurn={setTurn}
            setWinState={setWinState}
            turn={turn}
            winState={winState}
          />
        )}
        {/* {modes[selected] === 'Super Tic-Tac-Toe'} */}
      </div>
    </div>
  )
}
