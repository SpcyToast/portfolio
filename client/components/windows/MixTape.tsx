import { WindowProps } from '@/models/window'
import { Mixtape } from '@/models/mixtape'
import { useEffect, useState } from 'react'
import Cassette from './mixtape/Cassette'
import '@/client/styles/mixtape.css'

export default function MixTape({ setRoute }: WindowProps) {
  const [loading, setLoading] = useState(true)
  const [mixtapes, setMixTapes] = useState<Array<Mixtape>>([
    { id: -1, name: "didn't work stupid", author: 'Nun yu' },
  ])

  useEffect(() => {
    setRoute('https://www.youtube.com/shorts/NaHXKLTkbo4')
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/mixtape')
        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects - ${response.status} ${response.statusText}`
          )
        }
        const data = await response.json()
        setMixTapes(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (!loading) {
    return (
      <>
        {mixtapes.map((tape, i) => (
          <Cassette
            tape_name={tape.name}
            font=""
            font_colour=""
            colour_A=""
            colour_B=""
            colour_C=""
            colour_D=""
            colour_E=""
            colour_F=""
            colour_G=""
            image=""
            key={i}
          />
        ))}
      </>
    )
  } else {
    return (
      <>
        <div className="mixtape-loading">
          <img src="/mixtape/cassette-cog.svg" className="loading-spin" />
          <img src="/mixtape/cassette-cog.svg" className="loading-spin" />
        </div>
      </>
    )
  }
}
