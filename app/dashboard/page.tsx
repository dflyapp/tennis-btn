import PlayerList from 'app/ui/PlayerList'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from 'utils/supabase/server'
import { migrate, signout } from 'app/login/actions'

export default async function Dashboard() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="px-2 md:px-0 container max-w-lg mx-auto">
      <div className="flex items-center gap-x-2">
        <Link className="btn btn-link" href="/">
          Home
        </Link>
        <button className="btn btn-link" formAction={signout}>
          Thoát
        </button>
        <button className="btn btn-link" formAction={migrate}>
          Migrate
        </button>
      </div>
      <form>
        Xin chào <strong>{data.user.email}!</strong>
      </form>
      <PlayerList />
    </div>
  )
}
