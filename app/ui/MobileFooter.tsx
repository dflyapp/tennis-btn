import { House } from 'lucide-react'
import Link from 'next/link'

export default function MobileFooter() {
  return (
    <section className="z-20 fixed bottom-0 left-0 bg-primary h-20 w-full">
      <div className="flex justify-between items-center h-full px-4">
        <Link
          className="btn btn-link text-white text-xl"
          href="/dashboard/male"
        >
          Nam
        </Link>
        <Link href="/login">
          <House size={40} color="white" />
        </Link>
        <Link
          className="btn btn-link text-white text-xl"
          href="/dashboard/female"
        >
          Nữ
        </Link>
      </div>
    </section>
  )
}
