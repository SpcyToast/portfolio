import { WindowProps } from '@/models/window'
import { Mixtape } from '@/models/mixtape'
import { useEffect, useState } from 'react'

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
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (!loading)
    return (
      <>
        {mixtapes.map((mixtape) => (
          <>
            <h1 style={{ padding: '5px' }}>{`id = ${mixtape.id}`}</h1>
            <h1 style={{ padding: '5px' }}>{`name = ${mixtape.name}`}</h1>
            <h1 style={{ padding: '5px' }}>{`author = ${mixtape.author}`}</h1>
          </>
        ))}
      </>
    )
}
