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
  const [log, setLog] = useState<any>([])

  function closeModal() {
    ref.current?.close()
  }

  async function getPlayerLog() {
    const { data, error } = await supabase
      .from('players_log')
      .select()
      .eq('ref_id', refId)
      .eq('is_male', model === 'players_male')
      .order('created_at', { ascending: false })

    if (error) alert('Error while getting log')
    if (data) setLog(data)
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
        <div className="modal-box">
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
          {log && log?.length > 0 ? (
            <table className="table mb-4">
              <thead>
                <tr>
                  <th>Nick Name</th>
                  <th>Max-Min</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                </tr>
              </thead>
              <tbody>
                {log?.map((l: any) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>
                      {l.max}-{l.min}
                    </td>
                    <td>
                      {dayjs(l.created_at).add(7, 'hours').format('DD/MM/YYYY')}
                    </td>
                    <td>
                      {dayjs(l.created_at).add(7, 'hours').format('HH:mm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-left py-4">chưa từng chỉnh điểm</p>
          )}
        </div>
      </dialog>
    </>
  )
}
