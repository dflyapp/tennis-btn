import { createClient } from 'utils/supabase/client'

export async function fetchData(
  options: {
    pageIndex: number
    pageSize: number
  },
  textSearch: string
) {
  console.log('options', options)
  const supabase = createClient()
  const { pageIndex, pageSize } = options

  const { count, error: countError } = await supabase
    .from('players_female')
    .select('*', { count: 'exact' })
  const offset = pageIndex * pageSize

  const { data, error } = await supabase
    .from('players_female')
    .select()
    .textSearch('name', textSearch, {
      type: 'plain',
    })
  // .order('id', { ascending: true })
  // .range(offset, offset + pageSize - 1)

  if (error || countError) {
    console.error(error?.message)
    console.error(countError?.message)
    return
  }

  return {
    rows: data,
    pageCount: Math.ceil((count || 0) / options.pageSize),
    rowCount: count || 0,
  }
}
