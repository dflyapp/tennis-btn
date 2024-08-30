import { SelectUser } from 'db/schema'
import { createClient } from 'utils/supabase/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const id = params.id
  const { data: players, error } = await supabase
    .from('players')
    .update({
      name: 'fff',
    })
    .eq('id', id)

  if (error) {
    return new Response(error.message, { status: 500, statusText: 'Error' })
  }

  return Response.json({ players })
}
