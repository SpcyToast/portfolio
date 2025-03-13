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
  font: string
  font_colour: string
  colour_A: string
  colour_B: string
  colour_C: string
  colour_D: string
  colour_E: string
  colour_F: string
  colour_G: string
  image: string
}
