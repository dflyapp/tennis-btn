import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'

import Image from 'next/image'
import Head from 'next/head'
import Header from 'components/Header'

export default async function PagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const markdownWithMeta = fs.readFileSync(
    path.join('assets/content', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return (
    <>
      {/* <Head>
        <title>{title2}</title>
        <meta name="description" content={excerpt} />
      </Head> */}
      <Header />
      <div className="giai-dau">
        <div className="container mx-auto">
          <div className="mt-24 flex justify-center">
            <Image
              className="border border-primary p-4"
              src={frontmatter.cover_image}
              alt=""
              width={500}
              height={100}
            />
          </div>
          <div className="px-2">
            <p className="text-sm text-dark mt-4 text-center">
              Ngày đăng: {dayjs(frontmatter.date).date()}
              {' tháng '}
              {dayjs(frontmatter.date).month() + 1}
            </p>
            {/* <h1 className="text-center text-2xl">{title2}</h1> */}
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
