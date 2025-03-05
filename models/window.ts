export interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Array<Taskbar>>>
  tasks: Array<Taskbar>
  taskName: string
  windowName: string
  icon: string
  windowLayers(window: number): void
  windowNum: number
  zIndex: number
  checkActive(): void
  removeFocus(): void
}

export interface TictactoeProps {
  setTurn: React.Dispatch<React.SetStateAction<number>>
  setWinState: React.Dispatch<React.SetStateAction<boolean>>
  winState: boolean
  turn: number
}

export interface WindowProps {
  setRoute: React.Dispatch<React.SetStateAction<string>>
}

export interface SuperProps {
  state: number
  currentBoard: number
  activeBoard: number
  checkActiveBoard(nextBoard: number): void
  turn: number
  setTurn: React.Dispatch<React.SetStateAction<number>>
  checkWin(outBoard: number[]): boolean
  setMainBoard: React.Dispatch<React.SetStateAction<number[]>>
  mainBoard: number[]
  reseted: boolean
  winState: boolean
}

export interface Taskbar {
  app: string
  label: string
  icon: string
  status: Tasks
  positionX: string
  positionY: string
}
export interface Tasks {
  active: boolean
  minimised: boolean
}
