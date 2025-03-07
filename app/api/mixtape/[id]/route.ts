import { turso } from '@/server/database'

interface Params {
  params: Package
}

interface Package {
  id: number
}

export const GET = async (req: Request, { params }: Params) => {
  const jointTable =
    'FROM mixtape INNER JOIN mixtape_songs ON mixtape.id = mixtape_songs.mixtape_id INNER JOIN songs ON mixtape_songs.song_id = songs.id'
  try {
    const mixtape = await turso.execute(
      `SELECT * ${jointTable} WHERE mixtape.id = ${params.id}`
    )

    return new Response(JSON.stringify(mixtape.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}
