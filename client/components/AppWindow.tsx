import { Props, Taskbar } from '@/models/window'
import TicTacToeWindow from './windows/TicTacToeWindow'
import MixTape from './windows/MixTape'
import Link from 'next/link'
import { MouseEvent, useState, TouchEvent } from 'react'
import '@/client/styles/window.css'

export default function AppWindow({
  setTasks,
  tasks,
  taskName,
  icon,
  windowName,
  windowLayers,
  windowNum,
  zIndex,
  removeFocus,
  launchOrder,
  setLaunchOrder,
}: Props) {
  const window = document.getElementById(taskName)
  const [route, setRoute] = useState('https://google.com')
  const [movable, setMovable] = useState(false)
  const appIndex: number = [...tasks].findIndex(
    (appName) => appName.app === taskName
  )

  function closeWindow() {
    const order: number[] = launchOrder.filter((apps) => apps != appIndex)
    const deactivate: Taskbar[] = [...tasks]
    deactivate[appIndex].status.active = false
    setLaunchOrder(order)
    setTasks(deactivate)
    removeFocus()
  }

  function minimiseWindow() {
    removeFocus()
    const minimise: Taskbar[] = [...tasks]
    minimise[appIndex].status.minimised = true
    setTasks(minimise)
  }

  function moveWindow(
    e: MouseEvent<HTMLLabelElement> | TouchEvent<HTMLLabelElement>
  ) {
    if (window && movable) {
      window.style.left = window.offsetLeft + e.movementX + 'px'
      window.style.top = window.offsetTop + e.movementY + 'px'
    }
  }

  function endMovement() {
    setMovable(false)
    const movement: Taskbar[] = [...tasks]
    if (window) {
      const moveLeft: string = window.style.left
      const moveTop: string = window.style.top
      movement[appIndex].positionX = moveLeft
      movement[appIndex].positionY = moveTop
      setTasks(movement)
    }
  }

  return (
    <div className="window" id={taskName} style={{ zIndex: zIndex }}>
      <span className="window-info">
        <label
          className="window-name"
          onMouseDown={() => {
            windowLayers(windowNum)
            setMovable(true)
            removeFocus()
          }}
          onMouseMove={(e) => moveWindow(e)}
          onMouseUp={() => endMovement()}
          onMouseLeave={() => endMovement()}
          onTouchStart={() => {
            windowLayers(windowNum)
            setMovable(true)
            removeFocus()
          }}
          onTouchMove={(e) => moveWindow(e)}
          onTouchEnd={() => endMovement()}
        >
          <img
            src={`icons/${icon}`}
            className="window-icon"
            draggable="false"
          />
          <p>{windowName}</p>
        </label>
        <button className="window-buttons" onClick={() => minimiseWindow()}>
          _
        </button>
        <Link href={route} rel="noopener noreferrer" target="_blank">
          <button className="window-buttons" onClick={() => removeFocus()}>
            ?
          </button>
        </Link>
        <button
          className="window-buttons"
          id="last-button"
          onClick={() => closeWindow()}
        >
          x
        </button>
      </span>
      {windowName === 'Tic-Tac-Toe' && (
        <div
          className="content tictactoe-layout"
          onClick={() => {
            windowLayers(windowNum)
            removeFocus()
          }}
        >
          <TicTacToeWindow setRoute={setRoute} />
        </div>
      )}
      {windowName === 'Mix Tape' && (
        <div
          className="content"
          onClick={() => {
            windowLayers(windowNum)
            removeFocus()
          }}
        >
          <MixTape setRoute={setRoute} />
        </div>
      )}
    </div>
  )
}
