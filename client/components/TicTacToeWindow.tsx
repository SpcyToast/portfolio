import { useState } from 'react'
import Tictactoe from '@/client/components/games/Tictactoe'
import OnlyThree from './games/OnlyThree'
import SuperTictactoe from './games/SuperTictactoe'

export default function TicTacToeWindow() {
  const modes: string[] = ['Tic-Tac-Toe', 'Max 3 Each', 'Super Tic-Tac-Toe']
  const [selected, setSelected] = useState(0)
  const [turn, setTurn] = useState(2)
  const [winState, setWinState] = useState(false)

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
      {modes[selected] === 'Max 3 Each' && (
        <OnlyThree
          setTurn={setTurn}
          setWinState={setWinState}
          turn={turn}
          winState={winState}
        />
      )}
      {modes[selected] === 'Super Tic-Tac-Toe' && (
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
