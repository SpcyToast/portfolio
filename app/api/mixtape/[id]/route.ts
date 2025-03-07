// import { turso } from '@/server/database'

// export const GET = async (req: Request) => {
//   const jointTable =
//     'FROM mixtape INNER JOIN mixtape_songs ON mixtape.id = mixtape_songs.mixtape_id INNER JOIN songs ON mixtape_songs.song_id = songs.id'
//   try {
//     const mixtape = await turso.execute(
//       `SELECT * ${jointTable} WHERE mixtape.id = ${1}`
//     )

//     return new Response(JSON.stringify(mixtape.rows), { status: 200 })
//   } catch (error) {
//     return new Response('Failed to fetch projects', { status: 500 })
//   }
// }
