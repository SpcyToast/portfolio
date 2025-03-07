'use client'
import AppWindow from '@/client/components/AppWindow'
import { useEffect, useState } from 'react'
import { Taskbar } from '@/models/window'
import defaultTaskbar from '@/client/data/taskbar.json'

export default function Home() {
  const maxWindows: number[] = Array(defaultTaskbar.length).fill(-1)
  const [focus, setFocus] = useState('')
  const [tasks, setTasks] = useState(defaultTaskbar)
  const [start, setStart] = useState(false)
  const [windowOrder, setWindowOrder] = useState(maxWindows)
  const [launchOrder, setLaunchOrder] = useState<Array<number>>([])
  const [date, setDate] = useState('')
  const [timeNow, setTimeNow] = useState('')

  setInterval(() => {
    const today: Date = new Date()
    const yyyy: number = today.getFullYear()
    let mm: string = String(today.getMonth() + 1)
    let dd: string = String(today.getDate())
    let timeHours: number = today.getHours()
    let timeMinutes: number = today.getMinutes()
    let time: string = timeHours + ':' + timeMinutes + ' am'

    if (Number(dd) < 10) {
      dd = '0' + dd
    }
    if (Number(mm) < 10) {
      mm = '0' + mm
    }
    if (timeHours > 12) {
      timeHours = timeHours - 12
      time = timeHours + ':' + timeMinutes + ' pm'
    }

    setDate(`${dd + '/' + mm + '/' + yyyy}`)
    setTimeNow(time)
  }, 1000)

  // function to launch applications or unminimise them
  function launch(appName: string) {
    const activation: Taskbar[] = [...tasks]
    const order: number[] = [...launchOrder]
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].app === appName) {
        !activation[i].status.active && order.push(i)
        activation[i].status.active = true
        activation[i].status.minimised = false
        setTasks(activation)
        windowLayers(i)
      }
    }
    removeFocus()
    setLaunchOrder(order)
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
      <div className="homepage" onClick={() => setStart(false)}>
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
            <img src={`icons/${application.icon}`} className="icon" />
            <p className="icon-label">{application.label}</p>
          </button>
        ))}
      </div>
      {launchOrder.map((task) => (
        <div
          id={tasks[task].status.minimised ? 'minimise-app' : ''}
          style={{
            left: tasks[task].positionX,
            top: tasks[task].positionY,
          }}
          key={`window${task}`}
        >
          <AppWindow
            setTasks={setTasks}
            tasks={tasks}
            taskName={tasks[task].app}
            icon={tasks[task].icon}
            windowName={tasks[task].label}
            windowLayers={(window) => windowLayers(window)}
            windowNum={task}
            zIndex={windowOrder[task]}
            removeFocus={removeFocus}
            setLaunchOrder={setLaunchOrder}
            launchOrder={launchOrder}
          />
        </div>
      ))}

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
          {launchOrder.map(
            (app, i) =>
              tasks[app].status.active && (
                <button
                  key={`taskbar-${i}`}
                  onClick={() => {
                    {
                      minimised(tasks[app].app)
                      removeFocus()
                    }
                  }}
                >
                  <img
                    src={`icons/${tasks[app].icon}`}
                    className="icons"
                    id={`${tasks[app].status.minimised && 'minimise'}`}
                  />
                </button>
              )
          )}
          <div className="date-time">
            <h1>{`${timeNow}`}</h1>
            <h1>{`${date}`}</h1>
          </div>
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
              <img src={`icons/${app.icon}`} className="start-app-image" />
              <h2>{app.label}</h2>
            </button>
          ))}
        </div>
      </footer>
    </>
  )
}
