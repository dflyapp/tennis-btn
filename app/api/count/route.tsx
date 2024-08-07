import { getCountsById } from 'db/queries'

export async function GET() {
  const res = await getCountsById(1) // id 1: all visits
  console.log('get all visits')

  return Response.json(res)
}
