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
      .update({
        name: data.name,
        max: data.max,
        min: data.min,
        phone: data.phone || '',
      })
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
        onClick={() =>
          (
            document?.getElementById(player.id.toString()) as HTMLDialogElement
          )?.showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
          <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
        </svg>
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
            <div className="flex gap-x-4 w-full">
              <label>
                <span className="w-16 inline-block">Tên: </span>
                <input
                  className="input input-bordered w-full"
                  defaultValue={player.name}
                  {...register('name')}
                />
              </label>
            </div>
            <div className="flex gap-x-4">
              <label>
                <span className="w-16 inline-block">Max: </span>
                <input
                  type="number"
                  step={5}
                  className="w-20 input input-bordered"
                  defaultValue={player.max}
                  {...register('max', { required: true })}
                />
              </label>
              <label>
                Min:{' '}
                <input
                  type="number"
                  step={5}
                  className="w-20 input input-bordered"
                  defaultValue={player.min}
                  {...register('min', { required: true })}
                />
              </label>
            </div>
            <div className="flex gap-x-4">
              <label>
                <span className="w-16 inline-block">Số dđ: </span>
                <input
                  type="number"
                  className="w-full input input-bordered"
                  defaultValue={player.phone || ''}
                  {...register('phone')}
                />
              </label>
            </div>
            {errors.name && (
              <span className="text-error">Name is required</span>
            )}
            {errors.max && <span className="text-error">Max is required</span>}
            {errors.min && <span className="text-error">Min is required</span>}

            <div className="mt-4 flex gap-x-4 justify-end">
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
