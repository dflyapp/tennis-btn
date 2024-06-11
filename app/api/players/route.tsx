import { createClient } from 'utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: players } = await supabase.from('players').select()

  return Response.json({ players })
}
