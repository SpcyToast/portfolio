import { db } from '@/server'
import {
  InsertMixtape,
  InsertMixtapeSong,
  InsertSong,
  SelectMixtape,
  SelectMixtapeSong,
  SelectSong,
  mixtape,
  mixtape_songs,
  songs,
} from '@/server/schema'

export async function getMixtapes(): Promise<
  Array<{
    id: number
    name: string
    author: string
  }>
> {
  return db.select().from(mixtape)
}
