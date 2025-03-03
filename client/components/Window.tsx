import { Props, Taskbar } from '@/models/window'
import TicTacToeWindow from './TicTacToeWindow'

export default function Window({
  setTasks,
  tasks,
  taskName,
  windowName,
}: Props) {
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
        <TicTacToeWindow />
      </div>
    </div>
  )
}
