export interface Props {
  setWindow: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TictactoeProps {
  setTurn: React.Dispatch<React.SetStateAction<number>>
  setWinState: React.Dispatch<React.SetStateAction<boolean>>
  winState: boolean
  turn: number
}
