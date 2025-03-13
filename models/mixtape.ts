export interface Mixtape {
  id: number
  name: string
  author: string
  font: string | null
  font_colour: string | null
  colour_A: string | null
  colour_B: string | null
  colour_C: string | null
  colour_D: string | null
  colour_E: string | null
  colour_F: string | null
  colour_G: string | null
  image: string | null
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
  font: string | null
  font_colour: string | null
  colour_A: string | null
  colour_B: string | null
  colour_C: string | null
  colour_D: string | null
  colour_E: string | null
  colour_F: string | null
  colour_G: string | null
  image: string | null
}
