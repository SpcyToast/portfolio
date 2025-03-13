import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const mixtape = sqliteTable('mixtape', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  author: text('author').notNull(),
  font: text('font'),
  font_colour: text('font_colour'),
  colour_A: text('colour_A'),
  colour_B: text('colour_B'),
  colour_C: text('colour_C'),
  colour_D: text('colour_D'),
  colour_E: text('colour_E'),
  colour_F: text('colour_F'),
  colour_G: text('colour_G'),
  image: text('image'),
})

export const songs = sqliteTable('songs', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  link: text('link').notNull(),
})

export const mixtape_songs = sqliteTable('mixtape_songs', {
  mixtape_id: integer('mixtape_id').primaryKey(),
  song_id: integer('song_id').notNull(),
  order: integer('order').notNull(),
})

export type InsertMixtape = typeof mixtape.$inferInsert
export type SelectMixtape = typeof mixtape.$inferSelect

export type InsertSong = typeof songs.$inferInsert
export type SelectSong = typeof songs.$inferSelect

export type InsertMixtapeSong = typeof mixtape_songs.$inferInsert
export type SelectMixtapeSong = typeof mixtape_songs.$inferSelect
