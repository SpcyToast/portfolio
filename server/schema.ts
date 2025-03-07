import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const mixtape = sqliteTable('mixtape', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  author: text('author').notNull(),
  // created: text('created')
  //   .default(sql`(CURRENT_TIMESTAMP)`)
  //   .notNull(),
  // updated: integer('updated', { mode: 'timestamp' }).$onUpdate(
  //   () => new Date()
  // ),
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
