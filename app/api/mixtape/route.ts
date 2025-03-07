import { turso } from '@/server/database'

export const GET = async (req: Request) => {
  try {
    const mixtape = await turso.execute('SELECT * FROM mixtape')

    return new Response(JSON.stringify(mixtape.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}
