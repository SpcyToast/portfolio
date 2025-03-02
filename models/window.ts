export interface Props {
  setWindow: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TictactoeProps {
  setTurn: React.Dispatch<React.SetStateAction<number>>
  setWinState: React.Dispatch<React.SetStateAction<boolean>>
  winState: boolean
  turn: number
}

export interface SuperProps {
  state: number
  currentBoard: number
  activeBoard: number
  setActiveBoard: React.Dispatch<React.SetStateAction<number>>
  turn: number
  setTurn: React.Dispatch<React.SetStateAction<number>>
  setWinState: React.Dispatch<React.SetStateAction<boolean>>
  setMainBoard: React.Dispatch<React.SetStateAction<number[]>>
  mainBoard: number[]
}
