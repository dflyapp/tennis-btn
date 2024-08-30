import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-y-4 w-1/2 mx-auto">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className="input input-bordered w-full max-w-xs"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <div className="flex flex-row gap-x-4">
        <button className="btn btn-primary" formAction={login}>
          Log in
        </button>
        <button className="btn ml-4" formAction={signup}>
          Sign up
        </button>
      </div>
    </form>
  )
}
