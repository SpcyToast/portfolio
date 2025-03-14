'use client'
import AppWindow from '@/client/components/AppWindow'
import { useEffect, useState } from 'react'
import { Taskbar } from '@/models/window'
import defaultTaskbar from '@/client/data/taskbar.json'
import '@/client/styles/homepage.css'

export default function Home() {
  // initalise an array which determines the order of which window is on top of another
  const maxWindows: number[] = Array(defaultTaskbar.length).fill(-1)
  const [windowOrder, setWindowOrder] = useState(maxWindows)
  // manages the status and information of each application
  const [tasks, setTasks] = useState(defaultTaskbar)
  // state that manages the states associated with desktop functionality
  const [launchOrder, setLaunchOrder] = useState<Array<number>>([])
  const [focus, setFocus] = useState('')
  const [start, setStart] = useState(false)
  const [detailed, setDetailed] = useState(false)
  // states used to display time and date
  const [date, setDate] = useState('')
  const [timeNow, setTimeNow] = useState('')

  // gets current time and date as soon as the page loads
  useEffect(() => {
    getCurrentDateAndTime()
  }, [])

  // updates date and time every second
  setInterval(() => {
    getCurrentDateAndTime()
  }, 1000)

  // function used to update date and time in the desired format
  function getCurrentDateAndTime() {
    const today: Date = new Date()
    const yyyy: number = today.getFullYear()
    let mm: string = String(today.getMonth() + 1)
    let dd: string = String(today.getDate())
    let timeHours: number = today.getHours()
    let timeMinutes: string = String(today.getMinutes())
    let time: string = timeHours + ':' + timeMinutes + ' am'

    // alter output string to display information in the desired format
    if (Number(dd) < 10) {
      dd = '0' + dd
    }
    if (Number(mm) < 10) {
      mm = '0' + mm
    }

    if (Number(timeMinutes) < 10) {
      timeMinutes = '0' + timeMinutes
      time = timeHours + ':' + timeMinutes + ' am'
    }

    if (timeHours > 12) {
      timeHours = timeHours - 12
      time = timeHours + ':' + timeMinutes + ' pm'
    }

    // update states for date and time
    setDate(`${dd + '/' + mm + '/' + yyyy}`)
    setTimeNow(time)
  }

  // function to launch or unminimise applications as well as set the launch order on the taskbar
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

  // Decides what happens when you click on an application in the task bar
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

  // forces window to be unminimised and in the top most position
  function windowLayers(windowIndex: number) {
    const isOpen: Taskbar[] = [...tasks]
    isOpen[windowIndex].status.minimised = false
    setTasks(isOpen)
    bringToFront(windowIndex)
  }

  // reorders windows to bring the clicked on application to the front regardless of position on the HTML
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

  // removes highlight from desktop icon and close the start menu
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
        <div
          className={`${detailed ? 'start-menu-max' : 'start-menu-max'}  ${
            !start && 'closed'
          }`}
        >
          <div className="account-details"></div>
          <div className={`start-menu-apps`}>
            {tasks.map((app, i) => (
              <button
                key={i}
                className="start-app"
                onClick={() => {
                  launch(app.app)
                }}
              >
                <img src={`icons/${app.icon}`} className="start-app-image" />
                <h2 className="start-app-text">{app.label}</h2>
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
