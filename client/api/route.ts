// import { db } from '@/server/db/index'

// export const GET = async (req: Request) => {
//   try {
//     const notes = await db.execute('SELECT * FROM notes')

//     return new Response(JSON.stringify(notes.rows), { status: 200 })
//   } catch (error) {
//     return new Response('Failed to fetch projects', { status: 500 })
//   }
// }
