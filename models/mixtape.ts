export interface Mixtape {
  id: number
  name: string
  author: string
}

export interface Songs {
  id: number
  name: string
  link: string
}

export interface MixtapeSongs {
  mixtape_id: number
  song_id: string
  order: string
}

export interface CassetteProps {
  tape_name: string
  colour_A: string
  colour_B: string
  colour_C: string
  image: string
}
