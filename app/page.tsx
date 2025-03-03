'use client'
import TictactoeWindow from '@/client/components/TictactoeWindow'
import { useState } from 'react'
import { Taskbar } from '@/models/window'

export default function Home() {
  const defaultTaskbar: Taskbar[] = [
    {
      app: 'tictactoe',
      icon: 'tictactoe.svg',
      status: {
        active: false,
        minimised: false,
      },
    },
  ]
  const [focus, setFocus] = useState('')
  const [tasks, setTasks] = useState(defaultTaskbar)

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
        <button
          className={`${focus === 'tictactoe' && 'focus'}`}
          onClick={() =>
            focus === 'tictactoe'
              ? useFocus('tictactoe')
              : setFocus('tictactoe')
          }
        >
          <img src="/tictactoe.svg" className="icon" />
          <p style={{ justifySelf: 'left', fontSize: '10px' }}>Tic-Tac-Toe</p>
        </button>
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
          <button id="start">Start</button>
          {tasks.map(
            (app, i) =>
              app.status.active && (
                <button key={i} onClick={() => minimised(app.app)}>
                  <img
                    src={`/${app.icon}`}
                    className="icons"
                    id={`${app.status.minimised && 'minimise'}`}
                  />
                </button>
              )
          )}
        </div>
      </footer>
    </>
  )
}
