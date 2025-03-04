import { Props, Taskbar } from '@/models/window'
import TicTacToeWindow from './TicTacToeWindow'
import MixTape from './MixTape'
import Link from 'next/link'
import { MouseEvent, useEffect, useState } from 'react'

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
  const appIndex: number = [...tasks].findIndex(
    (appName) => appName.app === taskName
  )

  useEffect(() => {
    if (window && movable) {
      window.style.left = tasks[appIndex].positionX + 'px'
      window.style.top = tasks[appIndex].positionX + 'px'
    }
  }, [])

  function closeWindow() {
    const deactivate: Taskbar[] = [...tasks]
    deactivate[appIndex].status.active = false
    setTasks(deactivate)
  }

  function minimiseWindow() {
    const minimise: Taskbar[] = [...tasks]
    minimise[appIndex].status.minimised = true
    setTasks(minimise)
  }

  function moveWindow(e: MouseEvent<HTMLLabelElement>) {
    const movement: Taskbar[] = [...tasks]
    if (window && movable) {
      movement[appIndex].positionX = window.offsetLeft + e.movementX
      movement[appIndex].positionY = window.offsetTop + e.movementY
      window.style.left = window.offsetLeft + e.movementX + 'px'
      window.style.top = window.offsetTop + e.movementY + 'px'
      setTasks(movement)
    }
  }

  return (
    <div className="window" id={taskName}>
      <span className="window-info">
        <label
          className="window-name"
          onMouseDown={() => setMovable(true)}
          onMouseMove={(e) => moveWindow(e)}
          onMouseUp={() => setMovable(false)}
          onMouseLeave={() => setMovable(false)}
          onClick={() => windowLayers(windowNum)}
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
      <div className="content" onClick={() => windowLayers(windowNum)}>
        {windowName === 'Tic-Tac-Toe' && (
          <TicTacToeWindow setRoute={setRoute} />
        )}
        {windowName === 'Mix Tape' && <MixTape setRoute={setRoute} />}
      </div>
    </div>
  )
}
