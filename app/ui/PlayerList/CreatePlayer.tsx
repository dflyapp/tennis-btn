import { useForm, SubmitHandler } from 'react-hook-form'

import { createClient } from 'utils/supabase/client'

interface CreatePlayer {
  updateCache?: () => void
}

type Inputs = {
  name: string
  max: number
  min: number
  phone?: string
}

export default function CreatePlayer({ updateCache }: CreatePlayer) {
  const supabase = createClient()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const largestId = await getLargestId('players_female')

    const { error } = await supabase.from('players_female').insert({
      id: largestId ? largestId + 1 : 1,
      name: data.name,
      max: data.max,
      min: data.min,
      updated_at: new Date(),
    })
    updateCache?.()

    if (error) {
      console.error(error.message)
    } else {
      closeModal()
    }
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
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document?.getElementById('modal-create-player') as HTMLDialogElement
          )?.showModal()
        }
      >
        Tạo VĐV Mới
      </button>
      <dialog id="modal-create-player" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tạo VĐV mới</h3>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              Name:
              <input
                className="ml-4 input input-bordered"
                {...register('name', { required: true })}
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
                Tạo
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
