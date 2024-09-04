import fs from 'fs'
import path from 'path'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Players() {
  const [players, setPlayers] = useState<any>([])

  async function getPlayers() {
    const { data } = await supabase.from('players').select()
    console.log(data)
    setPlayers(data)
  }

  useEffect(() => {
    getPlayers()
  }, [])

  return (
    <>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col gap-y-4">
          {players.map((e: any) => {
            return (
              <div className="my-8" key={e.id}>
                <p>
                  {e.id}: {e.name}
                </p>
                <p>{e.min}</p>
                <p>{e.max}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const hinhAnh = fs.readdirSync(path.join('public/hinh-anh'))
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`)

  return {
    props: {
      players,
    },
  }
}
