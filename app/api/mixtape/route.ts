import { db } from '@/server/database'
import { mixtape } from '@/server/schema'

export const GET = async (req: Request) => {
  try {
    const data = await db.select().from(mixtape)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}
