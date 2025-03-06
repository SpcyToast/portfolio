import { useEffect, useState } from 'react'
import Tictactoe from '@/client/components/windows/games/Tictactoe'
import OnlyThree from './games/OnlyThree'
import SuperTictactoe from './games/SuperTictactoe'
import { WindowProps } from '@/models/window'
import { MouseEvent } from 'react'

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
  const [animateLabel, setAnimateLabel] = useState(1)

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
    setAnimateLabel(movement)
  }

  return (
    <>
      <span className={`modes`}>
        <button key={selected[2]} onClick={() => rotate(2)}>
          <p className={`modes-text`} id="left-mode">
            {selected[2]}
          </p>
        </button>
        <label key={selected[0]}>{selected[0]}</label>
        <button key={selected[1]} onClick={() => rotate(1)}>
          <p className={`modes-text`} id="right-mode">
            {selected[1]}
          </p>
        </button>
      </span>
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
