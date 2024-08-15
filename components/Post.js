/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import dayjs from 'dayjs'

export default function Post({ post }) {
  return (
    <Link href={`/giai-dau/${post.slug}`}>
      <div className="mb-12 w-full p-4 cursor-pointer">
        <img src={post.frontmatter.cover_image} alt="" />

        <p className="text-sm text-dark mt-4">
          Ngày đăng: {dayjs(post.frontmatter.date).date()}
          {' tháng '}
          {dayjs(post.frontmatter.date).month() + 1}
        </p>

        <h4 className="mt-4 text-2xl font-bold text-secondary underline hover:opacity-80">
          {post.frontmatter.title}
        </h4>
        <p className="mt-4">{post.frontmatter.excerpt}</p>
      </div>
    </Link>
  )
}
