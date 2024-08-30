import PlayerList from 'app/ui/PlayerList'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from 'utils/supabase/server'

export default async function Dashboard() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="px-2 md:px-0 container mx-auto">
      <Link className="underline" href="/">
        Home
      </Link>
      <p>
        Xin chào <strong>{data.user.email}</strong>,
      </p>
      <PlayerList />
    </div>
  )
}
