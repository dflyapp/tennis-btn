import { House } from 'lucide-react'
import Link from 'next/link'

export default function MobileFooter() {
  return (
    <section className="z-20 fixed bottom-0 left-0 bg-primary h-12 w-full">
      <div className="flex justify-between items-center h-full px-4">
        <Link className="btn btn-link text-white" href="/dashboard/male">
          Nam
        </Link>
        <Link href="/login">
          <House color="white" />
        </Link>
        <Link className="btn btn-link text-white" href="/dashboard/female">
          Nữ
        </Link>
      </div>
    </section>
  )
}
