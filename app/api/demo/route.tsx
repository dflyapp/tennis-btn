import { getPostsForLast24Hours } from 'db/queries'

export async function GET() {
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   })
  const data = {
    res: 'Hello World',
  }

  const res = await getPostsForLast24Hours()
  console.log('demo res: ', res)

  return Response.json({ data })
}
