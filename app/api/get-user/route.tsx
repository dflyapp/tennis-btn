import { createClient } from 'utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  const response = await supabase.auth.getUser()
  if (response.error) {
    return new Response(response.error.message, {
      status: 500,
      statusText: 'Error',
    })
  }

  return Response.json(response.data)
}
