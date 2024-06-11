import { createClient } from 'utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  return Response.json({ notes })
}
