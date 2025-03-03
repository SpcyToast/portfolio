'use client'
import Window from '@/client/components/Window'
import { useState } from 'react'
import { Taskbar } from '@/models/window'
import defaultTaskbar from '@/client/data/taskbar.json'

export default function Home() {
  const [focus, setFocus] = useState('')
  const [tasks, setTasks] = useState(defaultTaskbar)
  const [start, setStart] = useState(false)

  function launch(appName: string) {
    const activation: Taskbar[] = [...tasks]
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].app === appName) {
        activation[i].status.active = true
        activation[i].status.minimised = false
        setTasks(activation)
      }
    }
    removeFocus()
  }

  function removeFocus() {
    setFocus('')
    setStart(false)
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
            onClick={() => {
              focus === application.app
                ? launch(application.app)
                : setFocus(application.app)
              setStart(false)
            }}
          >
            <img src={application.icon} className="icon" />
            <p className="icon-label">Tic-Tac-Toe</p>
          </button>
        ))}
      </div>

      {tasks[0].status.active && (
        <div id={tasks[0].status.minimised ? 'minimise-app' : ''}>
          <Window
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[0].app}
            windowName={tasks[0].label}
          />
        </div>
      )}

      <footer>
        <div className="taskbar">
          <button
            id="start"
            onClick={() => {
              {
                setStart(!start)
                setFocus('')
              }
            }}
          >
            Start
          </button>
          {tasks.map(
            (app, i) =>
              app.status.active && (
                <button
                  key={`taskbar-${i}`}
                  onClick={() => {
                    {
                      minimised(app.app)
                      removeFocus()
                    }
                  }}
                >
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
            <button
              key={`start-menu-${i}`}
              className="start-app"
              onClick={() => {
                launch(app.app)
              }}
            >
              <img src={app.icon} className="start-app-image" />
              <h2>{app.label}</h2>
            </button>
          ))}
        </div>
      </footer>
    </>
  )
}
