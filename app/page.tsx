'use client'
import Window from '@/src/pages/components/Window'
import { useState } from 'react'
import { Taskbar } from '@/models/window'
import defaultTaskbar from '@/src/data/taskbar.json'

export default function Home() {
  const maxWindows: number[] = Array(defaultTaskbar.length).fill(-1)
  const [focus, setFocus] = useState('')
  const [tasks, setTasks] = useState(defaultTaskbar)
  const [start, setStart] = useState(false)
  const [windowOrder, setWindowOrder] = useState(maxWindows)

  function launch(appName: string) {
    const activation: Taskbar[] = [...tasks]
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].app === appName) {
        activation[i].status.active = true
        activation[i].status.minimised = false
        setTasks(activation)
        windowLayers(i)
      }
    }
    removeFocus()
  }

  function minimised(app: string) {
    const minimise: Taskbar[] = [...tasks]
    const appIndex: number = minimise.findIndex(
      (appName) => appName.app === app
    )
    appIndex === windowOrder[0]
      ? minimiseWindows(minimise, appIndex)
      : windowLayers(appIndex)
  }

  function windowLayers(front: number) {
    const isOpen: Taskbar[] = [...tasks]
    isOpen[front].status.minimised = false
    setTasks(isOpen)
    const windowShift: number[] = [...windowOrder]
    if (windowShift[0] !== front) {
      windowShift.pop()
      windowShift.unshift(front)
      setWindowOrder(windowShift)
    }
  }

  function minimiseWindows(minimise: Taskbar[], back: number) {
    minimise[back].status.minimised = !minimise[back].status.minimised
    setTasks(minimise)
    const windowShift: number[] = [...windowOrder]
    const windowIndex: number = windowShift.findIndex(
      (window) => window === back
    )
    if (windowIndex !== windowShift.length - 1) {
      const reordered: number[] = windowShift.filter(
        (window) => window !== back
      )
      reordered.push(back)
      setWindowOrder(reordered)
    }
  }

  function removeFocus() {
    setFocus('')
    setStart(false)
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
            <p className="icon-label">{application.label}</p>
          </button>
        ))}
      </div>

      {windowOrder[1] !== -1 && tasks[windowOrder[1]].status.active && (
        <div id={tasks[windowOrder[1]].status.minimised ? 'minimise-app' : ''}>
          <Window
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[windowOrder[1]].app}
            windowName={tasks[windowOrder[1]].label}
            windowLayers={windowLayers}
            windowNum={windowOrder[1]}
          />
        </div>
      )}

      {windowOrder[0] !== -1 && tasks[windowOrder[0]].status.active && (
        <div id={tasks[windowOrder[0]].status.minimised ? 'minimise-app' : ''}>
          <Window
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[windowOrder[0]].app}
            windowName={tasks[windowOrder[0]].label}
            windowLayers={windowLayers}
            windowNum={windowOrder[0]}
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
