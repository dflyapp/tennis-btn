import { getCountsById, increaseCountsById } from 'db/queries'

export async function GET() {
  const res = await getCountsById(1) // id 1: count all visits
  console.log('log: get all visits')

  return Response.json(res)
}

export async function PUT() {
  await increaseCountsById(1) // id 1: count all visits
  console.log('log: increase visits')

  return Response.json({ updated: 1 })
}
