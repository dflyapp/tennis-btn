import { useForm, SubmitHandler } from 'react-hook-form'

import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'
import { useState } from 'react'
import { ModelType } from '.'

interface EditPlayerProps {
  player: SelectPlayerFemale
  updateCache: () => void
  model: ModelType
}

type Inputs = {
  name: string
  max: number
  min: number
  phone?: string
}

export default function EditPlayer({
  player,
  updateCache,
  model,
}: EditPlayerProps) {
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
    const { error } = await supabase
      .from(model)
      .update({ name: data.name, max: data.max, min: data.min })
      .eq('id', player.id)
    updateCache()

    if (error) {
      console.error(error.message)
    } else {
      closeModal()
      // update to log table
      const { error } = await supabase.from('players_log').insert({
        ref_id: player.id,
        is_male: model === 'players_male',
        name: data.name,
        max: data.max,
        min: data.min,
      })
      if (error) {
        alert('Failed to log changes to table players_log')
      }
    }
    setIsEditting(false)
  }

  function closeModal() {
    ;(
      document?.getElementById(player.id.toString()) as HTMLDialogElement
    )?.close()
    reset()
  }

  return (
    <>
      <button
        disabled={false}
        className="btn"
        onClick={() =>
          (
            document?.getElementById(player.id.toString()) as HTMLDialogElement
          )?.showModal()
        }
      >
        sửa
      </button>
      <dialog
        id={player.id.toString()}
        key={player.id.toString()}
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Đang điều chỉnh: {player.name}</h3>
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
                      defaultValue={player.name}
                      {...register('name')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step={5}
                      className="w-20 input input-bordered"
                      defaultValue={player.max}
                      {...register('max', { required: true })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step={5}
                      className="w-20 input input-bordered"
                      defaultValue={player.min}
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
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
