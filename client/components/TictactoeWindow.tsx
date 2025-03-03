import { useState } from 'react'
import Tictactoe from '@/client/components/games/Tictactoe'
import { Props, Taskbar } from '@/models/window'
import OnlyThree from './games/OnlyThree'
import SuperTictactoe from './games/SuperTictactoe'

export default function TictactoeWindow({
  setTasks,
  tasks,
  taskName,
  windowName,
}: Props) {
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

  function closeWindow() {
    const deactivate: Taskbar[] = [...tasks]
    const appIndex: number = deactivate.findIndex(
      (appName) => appName.app === taskName
    )
    deactivate[appIndex].status.active = false
    setTasks(deactivate)
  }

  function minimiseWindow() {
    const minimise: Taskbar[] = [...tasks]
    const appIndex: number = minimise.findIndex(
      (appName) => appName.app === taskName
    )
    minimise[appIndex].status.minimised = true
    setTasks(minimise)
  }

  return (
    <div className="window" id={windowName}>
      <span className="window-info">
        <label className="window-name" draggable={true}>
          {windowName}
        </label>
        <button className="window-buttons" onClick={() => minimiseWindow()}>
          _
        </button>
        <button className="window-buttons">□</button>
        <button
          className="window-buttons"
          id="last-button"
          onClick={() => closeWindow()}
        >
          x
        </button>
      </span>
      <div className="content">
        <span className="modes">
          <button onClick={() => rotate(-1)}>{`←`}</button>
          <label>{modes[selected]}</label>
          <button onClick={() => rotate(1)}>{`→`}</button>
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
        {modes[selected] === 'Super Tic-Tac-Toe' && (
          <SuperTictactoe
            setTurn={setTurn}
            setWinState={setWinState}
            turn={turn}
            winState={winState}
          />
        )}
      </div>
    </div>
  )
}
