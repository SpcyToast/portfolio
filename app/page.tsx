'use client'
import TictactoeWindow from '@/client/components/TictactoeWindow'
import { useState } from 'react'
import { Taskbar } from '@/models/window'
import defaultTaskbar from '@/client/data/taskbar.json'

export default function Home() {
  const [focus, setFocus] = useState('')
  const [tasks, setTasks] = useState(defaultTaskbar)
  const [start, setStart] = useState(false)

  function useFocus(appName: string) {
    const activation: Taskbar[] = [...tasks]
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].app === appName) {
        activation[i].status.active = true
        activation[i].status.minimised = false
        setTasks(activation)
      }
    }
    setFocus('')
  }

  function minimised(app: string) {
    const minimise: Taskbar[] = [...tasks]
    const appIndex: number = minimise.findIndex(
      (appName) => appName.app === app
    )
    minimise[appIndex].status.minimised = !minimise[appIndex].status.minimised
    setTasks(minimise)
  }

  return (
    <>
      <div className="homepage">
        {tasks.map((application, i) => (
          <button
            key={`application-icon-${i}`}
            className={`${focus === application.app && 'focus'}`}
            onClick={() =>
              focus === application.app
                ? useFocus(application.app)
                : setFocus(application.app)
            }
          >
            <img src={application.icon} className="icon" />
            <p style={{ justifySelf: 'left', fontSize: '10px' }}>Tic-Tac-Toe</p>
          </button>
        ))}
      </div>
      {tasks[0].status.active && (
        <div id={tasks[0].status.minimised ? 'minimise-app' : ''}>
          <TictactoeWindow
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[0].app}
            windowName={'Tic-Tac-Toe'}
          />
        </div>
      )}
      <footer>
        <div className="taskbar">
          <button id="start" onClick={() => setStart(!start)}>
            Start
          </button>
          {tasks.map(
            (app, i) =>
              app.status.active && (
                <button key={`taskbar-${i}`} onClick={() => minimised(app.app)}>
                  <img
                    src={`/${app.icon}`}
                    className="icons"
                    id={`${app.status.minimised && 'minimise'}`}
                  />
                </button>
              )
          )}
        </div>
        <div className={`start-menu ${!start && 'closed'}`}>
          {tasks.map((app, i) => (
            <button key={`start-menu-${i}`} className="start-app">
              <img src={app.icon} className="start-app-image" />
              <h2>{app.label}</h2>
            </button>
          ))}
        </div>
      </footer>
    </>
  )
}
