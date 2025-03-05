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

  // function to launch applications or unminimise them
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

  // Decides what happens when you click on an up active in the task bar
  // either bring active app to the front or minimise app
  function minimised(app: string) {
    const minimise: Taskbar[] = [...tasks]
    const appIndex: number = minimise.findIndex(
      (appName) => appName.app === app
    )
    windowOrder[appIndex] === Math.max(...windowOrder)
      ? minimiseWindows(minimise, appIndex)
      : windowLayers(appIndex)
  }

  function windowLayers(windowIndex: number) {
    // make sure application is not minimised
    const isOpen: Taskbar[] = [...tasks]
    isOpen[windowIndex].status.minimised = false
    setTasks(isOpen)
    bringToFront(windowIndex)
  }

  // sets opened window to the highest zIndex
  function bringToFront(windowIndex: number) {
    const oldLayer = windowOrder[windowIndex]
    const windowShift: number[] = windowOrder.map((window) => {
      if (window > oldLayer) {
        return window - 1
      }
      return window
    })
    windowShift[windowIndex] = windowShift.length
    setWindowOrder(windowShift)
  }

  // minimise or unminimise application
  function minimiseWindows(minimise: Taskbar[], windowIndex: number) {
    const minimiseLayer = [...windowOrder]
    minimise[windowIndex].status.minimised =
      !minimise[windowIndex].status.minimised
    setTasks(minimise)
    // if window is unminimised, ensure it is on top
    if (!minimise[windowIndex].status.minimised) {
      bringToFront(windowIndex)
    } else {
      // sets window index to minimum value after minimising while ensuring a maximum value exisits
      minimiseLayer[windowIndex] = 1
      if (Math.max(...windowOrder) === 1) {
        const searchOpen = tasks.findIndex(
          (opened) => opened.status.minimised === false
        )
        minimiseLayer[searchOpen] = 2
      }
      setWindowOrder(minimiseLayer)
    }
  }

  // removes highlight from desktop icon
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

      {tasks[0].status.active && (
        <div
          id={tasks[0].status.minimised ? 'minimise-app' : ''}
          style={{
            left: tasks[0].positionX,
            top: tasks[0].positionY,
          }}
        >
          <Window
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[0].app}
            windowName={tasks[0].label}
            windowLayers={windowLayers}
            windowNum={0}
            zIndex={windowOrder[0]}
          />
        </div>
      )}

      {tasks[1].status.active && (
        <div
          id={tasks[1].status.minimised ? 'minimise-app' : ''}
          style={{
            left: tasks[1].positionX,
            top: tasks[1].positionY,
          }}
        >
          <Window
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[1].app}
            windowName={tasks[1].label}
            windowLayers={windowLayers}
            windowNum={1}
            zIndex={windowOrder[1]}
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
