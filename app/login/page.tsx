import { createClient } from 'utils/supabase/server'
import { login, signout, signup } from './actions'

export default async function LoginPage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return (
      <form className="flex flex-col gap-y-4">
        <div>
          <label className="block" htmlFor="email">
            Email:
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block" htmlFor="password">
            Mật khẩu:
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="flex flex-row gap-4">
          <button className="btn btn-primary" formAction={login}>
            Đăng nhập
          </button>
          <button className="btn btn-active btn-link" formAction={signup}>
            Tạo tài khoản
          </button>
        </div>
      </form>
    )
  }

  return (
    <form className="flex flex-col gap-y-4 w-1/2 mx-auto">
      <div className="flex flex-col gap-x-4">
        <p>User is logged in already,</p>
        <button className="btn w-fit" formAction={signout}>
          Thoát tài khoản
        </button>
      </div>
    </form>
  )
}
