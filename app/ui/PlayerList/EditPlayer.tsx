import { useForm, SubmitHandler } from 'react-hook-form'

import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'

interface EditPlayerProps {
  player: SelectPlayerFemale
  updateCache: () => void
}

type Inputs = {
  name: string
  max: number
  min: number
  phone?: string
}

export default function EditPlayer({ player, updateCache }: EditPlayerProps) {
  const supabase = createClient()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await supabase
      .from('players_female')
      .update({ name: data.name, max: data.max, min: data.min })
      .eq('id', player.id)
    updateCache()

    if (error) {
      console.error(error.message)
    } else {
      closeModal()
    }
  }

  function closeModal() {
    ;(document?.getElementById(player.name) as HTMLDialogElement)?.close()
  }

  return (
    <>
      <button
        disabled={false}
        className="btn"
        onClick={() =>
          (
            document?.getElementById(player.name) as HTMLDialogElement
          )?.showModal()
        }
      >
        Chỉnh sửa
      </button>
      <dialog id={player.name} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editting {player.name}</h3>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              Name:
              <input
                className="ml-4 input input-bordered"
                defaultValue={player.name}
                {...register('name')}
              />
            </label>
            {errors.name && (
              <span className="text-error">This field is required</span>
            )}

            <label>
              Max:
              <input
                type="number"
                className="ml-4 input input-bordered"
                defaultValue={player.max}
                {...register('max', { required: true })}
              />
            </label>
            {errors.max && (
              <span className="text-error">This field is required</span>
            )}

            <label>
              Min:
              <input
                type="number"
                className="ml-4 input input-bordered"
                defaultValue={player.min}
                {...register('min', { required: true })}
              />
            </label>
            {errors.min && (
              <span className="text-error">This field is required</span>
            )}

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
              <button className="btn btn-primary" type="submit">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
