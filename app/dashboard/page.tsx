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
    <div>
      <Link href="/">Home</Link>
      <p>Hello {data.user.email},</p>
      <PlayerList />
    </div>
  )
}
