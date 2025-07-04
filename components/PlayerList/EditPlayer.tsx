import { useForm, SubmitHandler } from 'react-hook-form'
import * as Sentry from '@sentry/nextjs'

import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'
import { useState } from 'react'
import { ModelType } from '.'
import { updatePlayer } from './actions'

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
  } = useForm<Inputs>({
    defaultValues: {
      name: player.name,
      max: player.max,
      min: player.min,
      phone: player.phone || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return Sentry.startSpan(
      {
        name: 'editPlayer',
        op: 'function',
      },
      async (span) => {
        try {
          const SECRET = localStorage.getItem('secret')
          if (SECRET === null || SECRET !== process.env.NEXT_PUBLIC_SECRET) {
            alert('Sai mật mã, vui lòng thử lại sau')
            return
          }

          setIsEditting(true)

          await updatePlayer(model, player.id, data)
          updateCache()
          closeModal()

          setIsEditting(false)

          // update to log table
          console.log('Updating players_log table')
          await supabase.from('players_log').insert({
            ref_id: player.id,
            is_male: model === 'players_male',
            name: data.name,
            max: data.max,
            min: data.min,
          })
        } finally {
          setIsEditting(false)
          span?.end()
        }
      }
    )
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
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
                <span className="w-16 block sm:inline-block">Tên: </span>
                <input
                  className="input input-bordered w-full"
                  defaultValue={player.name}
                  {...register('name')}
                />
              </label>
            </div>
            <div className="flex gap-x-4">
              <label>
                <span className="w-fit sm:w-16 inline-block">Max: </span>
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
                <span className="w-16 block sm:inline-block">Số dđ: </span>
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
