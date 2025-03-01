'use client'
import TictactoeWindow from '@/client/components/TictactoeWindow'
import { useState } from 'react'

export default function Home() {
  const [tictactoe, setTictactoe] = useState(false)

  return (
    <div className="homepage">
      <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
      </button>
      <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
      </button>
      <button onClick={() => setTictactoe(true)}>
        <img src="/tictactoe.svg" className="icon" />
      </button>
      {tictactoe && <TictactoeWindow setWindow={setTictactoe} />}
    </div>
  )
}
