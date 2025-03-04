import { Props, Taskbar } from '@/models/window'
import TicTacToeWindow from './TicTacToeWindow'
import MixTape from './MixTape'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'

export default function Window({
  setTasks,
  tasks,
  taskName,
  windowName,
  windowLayers,
  windowNum,
}: Props) {
  const window = document.getElementById(taskName)
  const [route, setRoute] = useState('https://google.com')
  const [movable, setMovable] = useState(false)
  // const appIndex: number = [...tasks].findIndex(
  //   (appName) => appName.app === taskName
  // )

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
    // console.log(
    //   'why',
    //   minimiseWin[appIndex].status.minimised,
    //   tasks[appIndex].status.minimised,
    //   minimiseWin,
    //   tasks,
    //   appIndex
    // )
    setTasks(minimise)
  }

  function moveWindow(e: MouseEvent<HTMLLabelElement>) {
    if (window && movable) {
      window.style.left = window.offsetLeft + e.movementX + 'px'
      window.style.top = window.offsetTop + e.movementY + 'px'
    }
  }

  return (
    <div
      className="window"
      id={taskName}
      onClick={() => windowLayers(windowNum)}
    >
      <span className="window-info">
        <label
          className="window-name"
          onMouseDown={() => setMovable(true)}
          onMouseMove={(e) => moveWindow(e)}
          onMouseUp={() => setMovable(false)}
          onMouseLeave={() => setMovable(false)}
        >
          {windowName}
        </label>
        <button className="window-buttons" onClick={() => minimiseWindow()}>
          _
        </button>
        <Link href={route} rel="noopener noreferrer" target="_blank">
          <button className="window-buttons">?</button>
        </Link>
        <button
          className="window-buttons"
          id="last-button"
          onClick={() => closeWindow()}
        >
          x
        </button>
      </span>
      <div className="content">
        {windowName === 'Tic-Tac-Toe' && (
          <TicTacToeWindow setRoute={setRoute} />
        )}
        {windowName === 'Mix Tape' && <MixTape setRoute={setRoute} />}
      </div>
    </div>
  )
}
