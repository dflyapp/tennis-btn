import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Post from 'components/Post'

import { sortByDate } from 'utils'
import Header from 'components/Header'
import Footer from 'components/Footer'

export const metadata = {
  title: 'Tennis BTN - Giải đấu',
  description: 'Cập nhật các giải đấu tennis BTN nhanh nhất tại đây!',
}

export default function Page() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('assets/content'))

  // Get slug and frontmatter from posts
  const posts = files
    .map((filename) => {
      // Create slug
      const slug = filename.replace('.md', '')

      // Get frontmatter
      const markdownWithMeta = fs.readFileSync(
        path.join('assets/content', filename),
        'utf-8'
      )

      const { data: frontmatter } = matter(markdownWithMeta)

      return {
        slug,
        frontmatter,
      }
    })
    .sort(sortByDate)

  return (
    <>
      <div className="max-w-lg mx-auto">
        <Header />

        <div className="h-20" />
        <h3 className="text-dark text-center mt-24 uppercase text-primary font-bold text-4xl">
          Các giải đấu
        </h3>

        <div className="container mx-auto my-24">
          <div className="flex flex-wrap">
            {posts.map((post: any, index: any) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </>
  )
}
