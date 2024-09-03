import { SelectPlayerFemale } from 'db/schema'
import { createClient } from 'utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: players, error } = await supabase
    .from('players_male')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()
  if (error) {
    return new Response(error.message, { status: 500, statusText: 'Error' })
  }

  return Response.json({ players })
}