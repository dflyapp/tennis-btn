import { useForm, SubmitHandler } from 'react-hook-form'

import { createClient } from 'utils/supabase/client'
import { ModelType } from '.'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
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
  const [show, setShow] = useState(false)

  function closeModal() {
    ref.current?.close()
  }

  async function getPlayerLog() {
    const { data, error } = await supabase
      .from('players_log')
      .select()
      .eq('ref_id', refId)
      .returns<SelectLogMale[]>()
    if (error) alert('Error while getting log')
    if (data) setLog(data)
  }

  useEffect(() => {
    if (ref.current?.show) {
      console.log('in effect')
      //   ref.current?.showModal()
      //   getPlayerLog()
      console.log(ref.current)
      console.log(ref.current?.show)
    }
  }, [ref.current?.show])

  return (
    <>
      <span
        className="text-primary cursor-pointer"
        onClick={() => {
          ref.current?.showModal()
        }}
      >
        {children}
      </span>
      <dialog ref={ref} id="modal-view-player" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Lịch sử chỉnh sửa điểm</h3>
          {log?.length === 0 ? (
            <p className="text-left py-4">chưa từng chỉnh điểm</p>
          ) : (
            <table className="table mb-4">
              <thead>
                <tr>
                  <th>Nick Name</th>
                  <th>Max</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody>
                {log?.map((l) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>{l.max}</td>
                    <td>{l.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button
            onClick={() => {
              closeModal()
            }}
            className="btn"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              getPlayerLog()
            }}
            className="btn"
          >
            Get
          </button>
        </div>
      </dialog>
    </>
  )
}
