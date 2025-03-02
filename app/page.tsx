'use client'
import TictactoeWindow from '@/client/components/TictactoeWindow'
import { useState } from 'react'

export default function Home() {
  const [tictactoe, setTictactoe] = useState(false)

  return (
    <div className="homepage">
      <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
        <p style={{ justifySelf: 'left', fontSize: '10px' }}>Tic-Tac-Toe</p>
      </button>
      {/* <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
        <p style={{justifySelf: "left", fontSize:"10px"}}>Tic-Tac-Toe</p>
      </button>
      <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
        <p style={{justifySelf: "left", fontSize:"10px"}}>Tic-Tac-Toe</p>
      </button> */}
      {tictactoe && <TictactoeWindow setWindow={setTictactoe} />}
    </div>
  )
}
