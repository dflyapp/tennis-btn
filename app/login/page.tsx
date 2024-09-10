import { createClient } from 'utils/supabase/server'
import { login, migrate, revalidate, signout, signup } from './actions'
import Link from 'next/link'
import PWA from 'app/ui/PWA'

export default async function LoginPage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return (
      <form className="mt-12 px-2 flex flex-col gap-y-4">
        <h1>Đăng nhập vào hệ thống:</h1>
        <div>
          <label className="block text-xs" htmlFor="email">
            Email:
          </label>
          <input
            className="mt-1 input input-bordered w-full max-w-xs"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block text-xs" htmlFor="password">
            Mật khẩu:
          </label>
          <input
            className="mt-1 input input-bordered w-full max-w-xs"
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
          {/* <button className="btn btn-active btn-link" formAction={signup}>
            Tạo tài khoản
          </button> */}
        </div>
      </form>
    )
  }

  return (
    <form className="flex flex-col gap-y-4 w-1/2 mx-auto">
      <div className="flex flex-col gap-4">
        <div className="text-xs mt-24">
          <p>Xin chào!</p>
          <p className="text-primary">{data.user.email}</p>
        </div>
        <div className="flex flex-col items-start">
          <Link className="btn btn-link" href="/">
            Trang chủ
          </Link>
          <Link className="btn btn-link" href="/dashboard/male">
            Chỉnh Điểm Nam
          </Link>
          <Link className="btn btn-link" href="/dashboard/female">
            Chỉnh Điểm Nữ
          </Link>
          <button className="btn btn-link" formAction={signout}>
            Thoát
          </button>
          {/* <button className="btn btn-link" formAction={migrate}>
            Migrate
          </button> */}
          <button className="btn btn-link" formAction={revalidate}>
            Revalidate Caches
          </button>
        </div>
      </div>
      <PWA />
    </form>
  )
}
