import { PropsWithChildren, useRef, useState } from 'react'
import dayjs from 'dayjs'

import { createClient } from 'utils/supabase/client'
import { ModelType } from '.'
import { SelectLogMale } from 'db/schema'

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
  const [log, setLog] = useState<SelectLogMale[]>()

  function closeModal() {
    ref.current?.close()
  }

  async function getPlayerLog() {
    const { data, error } = await supabase
      .from('players_log')
      .select()
      .eq('ref_id', refId)
      .eq('is_male', model === 'players_male')
      .returns<SelectLogMale[]>()

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
          <h3 className="font-bold text-lg">Lịch sử chỉnh sửa:</h3>
          {log && log?.length > 0 ? (
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
                {log?.map((l) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>{l.max}</td>
                    <td>{l.min}</td>
                    <td>{dayjs(l.createdAt).format('DD/MM/YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-left py-4">chưa từng chỉnh điểm</p>
          )}
          <button
            onClick={() => {
              closeModal()
            }}
            className="btn"
          >
            Đóng
          </button>
        </div>
      </dialog>
    </>
  )
}
