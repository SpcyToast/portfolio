import { WindowProps } from '@/models/window'
import { useEffect } from 'react'

export default function MixTape({ setRoute }: WindowProps) {
  useEffect(() => {
    setRoute('https://www.youtube.com/shorts/NaHXKLTkbo4')
  }, [])

  return <>Tape</>
}
