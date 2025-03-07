import { getMixtapes } from '@/server/queries/mixtape'

export const GET = async (req: Request) => {
  try {
    const tapes = await getMixtapes()

    return new Response(JSON.stringify(tapes), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 })
  }
}
