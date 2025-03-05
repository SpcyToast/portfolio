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
  // const [selected, setSelected] = useState(0)
  const [selected, setSelected] = useState(modes)
  const [selectedRoute, setSelectedRoute] = useState(routes)
  const [turn, setTurn] = useState(2)
  const [winState, setWinState] = useState(false)

  useEffect(() => {
    setRoute(selectedRoute[0])
  }, [selectedRoute])

  function rotate(movement: number) {
    const cycle: string[] = [...selected]
    const reroute: string[] = [...selectedRoute]
    if (movement === 1) {
      cycle.push(cycle[0])
      reroute.push(reroute[0])
      cycle.shift()
      reroute.shift()
    } else {
      cycle.unshift(cycle[movement])
      routes.unshift(routes[movement])
      cycle.pop()
      routes.pop()
    }
    setSelected(cycle)
    setSelectedRoute(reroute)
  }

  return (
    <>
      <span className="modes">
        <button onClick={() => rotate(2)}>
          <p>{`←`}</p>
        </button>
        <label>{selected[0]}</label>
        <button onClick={() => rotate(1)}>
          <p>{`→`}</p>
        </button>
      </span>
      <br />
      {winState && (
        <h1 className="tictactoe-win">{`${turn === 0 ? 'O' : 'X'} Wins!`}</h1>
      )}
      {selected[0] === 'Tic-Tac-Toe' && (
        <Tictactoe
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
      {selected[0] === 'Tic-Tac-Toe Bolt' && (
        <OnlyThree
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
      {selected[0] === 'Ultimate Tic-Tac-Toe' && (
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
