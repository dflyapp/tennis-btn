import { PropsWithChildren, useEffect, useRef, useState } from 'react'
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
  const [modifiedLogs, setModifiedLogs] = useState<any[]>()
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

  useEffect(() => {
    if (logs && logs?.length > 0) {
      setModifiedLogs(
        logs?.filter((f) => {
          const startLogDate = dayjs('2025-07-05')
          if (dayjs(f.created_at).isAfter(startLogDate)) return true
          return false
        })
      )
    }
  }, [logs])

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
          <div className="flex justify-between">
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
            <ShowLogs logs={modifiedLogs} />
          )}
        </div>
      </dialog>
    </>
  )
}

function ShowLogs({ logs }: { logs?: any[] }) {
  if (logs === undefined || logs?.length == 0) {
    return (
      <div>
        <p className="text-left pt-4">chưa từng chỉnh điểm</p>
        <p className="text-left text-xs">--tính từ ngày 5 tháng 7 năm 2025--</p>
      </div>
    )
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
        {logs.map((l) => (
          <tr key={l.id}>
            <td>{l.name}</td>
            <td>{l.max}</td>
            <td>{l.min}</td>
            <td>{dayjs(l.created_at).format('DD/MM/YYYY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
