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
