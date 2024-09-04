import { useForm, SubmitHandler } from 'react-hook-form'

import { createClient } from 'utils/supabase/client'
import { ModelType } from '.'
import { useState } from 'react'

interface CreatePlayer {
  updateCache?: () => void
  invalidateQuery?: () => void
  model: ModelType
}

type Inputs = {
  name: string
  max: number
  min: number
  phone?: string
}

export default function CreatePlayer({
  updateCache,
  invalidateQuery,
  model,
}: CreatePlayer) {
  const supabase = createClient()
  const [isEditting, setIsEditting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsEditting(true)
    const largestId = await getLargestId(model)

    const { error } = await supabase.from(model).insert({
      id: largestId ? largestId + 1 : 1,
      name: data.name,
      max: data.max,
      min: data.min,
      updated_at: new Date(),
    })

    // invalidate caches: SWR and Tanksack Query
    updateCache?.()
    invalidateQuery?.()

    if (error) {
      console.error(error.message)
    } else {
      closeModal()
      reset()
    }
    setIsEditting(false)
  }

  async function getLargestId(tableName: string) {
    const { data, error } = await supabase
      .from(tableName)
      .select('id', { count: 'exact' })
      .order('id', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error:', error)
      return null
    }

    if (!data || !data[0]) {
      console.log(`No records found in ${tableName}`)
      return null
    }

    const largestId = data[0].id

    console.log(`The largest ID in ${tableName} is:`, largestId)
    return largestId
  }

  function closeModal() {
    ;(
      document?.getElementById('modal-create-player') as HTMLDialogElement
    )?.close()
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Bảng điểm {model == 'players_male' ? 'Nam' : 'Nữ'}</h2>
        <button
          className="btn btn-secondary"
          onClick={() =>
            (
              document?.getElementById(
                'modal-create-player'
              ) as HTMLDialogElement
            )?.showModal()
          }
        >
          {model == 'players_female' ? 'Tạo VĐV Nữ Mới' : 'Tạo VĐV Nam Mới'}
        </button>
      </div>
      <dialog id="modal-create-player" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {model == 'players_female' ? 'Tạo VĐV Nữ Mới' : 'Tạo VĐV Nam Mới'}
          </h3>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Nick Name</th>
                  <th>Max</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="input input-bordered"
                      {...register('name', { required: true })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step={5}
                      className="w-20 input input-bordered"
                      {...register('max', { required: true })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step={5}
                      className="w-20 input input-bordered"
                      {...register('min', { required: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {errors.name && (
              <span className="text-error">Name is required</span>
            )}

            {errors.max && <span className="text-error">Max is required</span>}

            {errors.min && <span className="text-error">Min is required</span>}

            <div className="flex gap-x-4 justify-end">
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault()
                  closeModal()
                }}
              >
                Đóng
              </button>
              <button
                disabled={isEditting}
                className="btn btn-primary"
                type="submit"
              >
                Tạo
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
