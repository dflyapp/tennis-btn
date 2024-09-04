import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'

import { Header } from 'layouts'
import Image from 'next/image'
import Head from 'next/head'

export default function PostPage({
  frontmatter: { title: title2, date, cover_image, excerpt },
  slug,
  content,
}: any) {
  return (
    <>
      <Head>
        <title>{title2}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <Header />
      <div className="giai-dau">
        <div className="container mx-auto">
          <div className="mt-24 flex justify-center">
            <Image
              className="border border-primary p-4"
              src={cover_image}
              alt=""
              width={500}
              height={100}
            />
          </div>
          <div className="px-2">
            <p className="text-sm text-dark mt-4 text-center">
              Ngày đăng: {dayjs(date).date()}
              {' tháng '}
              {dayjs(date).month() + 1}
            </p>
            <h1 className="text-center text-2xl">{title2}</h1>
          </div>
        </div>
      </div>
      <div className="giai-dau container mx-auto px-4">
        <div className="my-12 mx-auto px-4 w-full md:w-1/2 blog-content">
          <ReactMarkdown>{content}</ReactMarkdown>
          {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div> */}
        </div>
      </div>

      {/* footer */}
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('pages/giai-dau/content'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join('pages/giai-dau/content', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
