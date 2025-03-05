import { useEffect, useState } from 'react'
import Tictactoe from '@/client/components/windows/games/Tictactoe'
import OnlyThree from './games/OnlyThree'
import SuperTictactoe from './games/SuperTictactoe'
import { WindowProps } from '@/models/window'

export default function TicTacToeWindow({ setRoute }: WindowProps) {
  const modes: string[] = [
    'Tic-Tac-Toe',
    'Tic-Tac-Toe Bolt',
    'Ultimate Tic-Tac-Toe',
  ]
  const routes: string[] = [
    'https://www.youtube.com/watch?v=USEjXNCTvcc',
    'https://www.youtube.com/watch?v=EaJUgd5GWIo&ab_channel=TripleSGames',
    'https://www.youtube.com/watch?v=zP4GFgXTY4M&ab_channel=ActuallyFunYouthGames',
  ]
  const [selected, setSelected] = useState(0)
  const [turn, setTurn] = useState(2)
  const [winState, setWinState] = useState(false)

  useEffect(() => {
    setRoute(routes[selected])
  }, [rotate])

  function rotate(movement: number) {
    selected + movement === -1
      ? setSelected(modes.length - 1)
      : selected + movement === modes.length
      ? setSelected(0)
      : setSelected(selected + movement)
  }

  return (
    <>
      <span className="modes">
        <button onClick={() => rotate(-1)}>{`←`}</button>
        <label>{modes[selected]}</label>
        <button onClick={() => rotate(1)}>{`→`}</button>
      </span>{' '}
      <br />
      {winState && (
        <h1 className="tictactoe-win">{`${turn === 0 ? 'O' : 'X'} Wins!`}</h1>
      )}
      {modes[selected] === 'Tic-Tac-Toe' && (
        <Tictactoe
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
      {modes[selected] === 'Tic-Tac-Toe Bolt' && (
        <OnlyThree
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
      {modes[selected] === 'Ultimate Tic-Tac-Toe' && (
        <SuperTictactoe
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
    </>
  )
}
