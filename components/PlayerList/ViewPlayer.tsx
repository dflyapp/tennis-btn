import { PropsWithChildren, useRef, useState } from 'react'
import dayjs from 'dayjs'

import { createClient } from 'utils/supabase/client'
import { ModelType } from '.'

interface ViewPlayerProps {
  model: ModelType
  refId: number
}

export default function ViewPlayer({
  model,
  refId,
  children,
}: ViewPlayerProps & PropsWithChildren) {
  const supabase = createClient()
  const ref = useRef<HTMLDialogElement>(null)
  const [logs, setLogs] = useState<any[]>()
  const [loading, setLoading] = useState(false)

  function closeModal() {
    ref.current?.close()
  }

  async function getPlayerLog() {
    setLoading(true)
    const { data, error } = await supabase
      .from('players_log')
      .select()
      .eq('ref_id', refId)
      .eq('is_male', model === 'players_male')
      .order('created_at', { ascending: false })

    if (error) alert('Error while getting log')
    if (data) setLogs(data)

    setLoading(false)
  }

  return (
    <>
      <span
        className="text-primary cursor-pointer"
        onClick={() => {
          ref.current?.showModal()
          getPlayerLog()
        }}
      >
        {children}
      </span>
      <dialog ref={ref} id="modal-view-player" className="modal">
        <div className="modal-box min-h-[350px]">
          <div className='flex justify-between'>
            <h3 className="font-bold text-lg">Lịch sử chỉnh sửa:</h3>
            <button
              onClick={() => {
                closeModal()
              }}
              className="btn"
            >
              Đóng
            </button>
          </div>
          {loading ? (
            <div className="flex gap-x-4 py-8">
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : (
            <ShowLogs logs={logs} />
          )}
        </div>
      </dialog>
    </>
  )
}

function ShowLogs({ logs }: { logs?: any[] }) {
  if (logs === undefined || logs?.length == 0) {
    return <p className="text-left py-4">chưa từng chỉnh điểm</p>
  }

  return (
    <table className="table mb-4">
      <thead>
        <tr>
          <th>Nick Name</th>
          <th>Max</th>
          <th>Min</th>
          <th>Thời gian</th>
        </tr>
      </thead>
      <tbody>
        {logs?.map((l) => (
          <tr key={l.id}>
            <td>{l.name}</td>
            <td>{l.max}</td>
            <td>{l.min}</td>
            <td>{dayjs(l.createdAt).format('DD/MM/YYYY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
