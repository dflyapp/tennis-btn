import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

import { Header } from "layouts";

export default function PostPage({
  frontmatter: { title: title2, date, cover_image, excerpt },
  slug,
  content,
}: any) {
  return (
    <>
      <Head>
        <title>Bài viết</title>
        <meta name="description" content={excerpt} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className="container mx-auto">
          <div className="w-3/4 mx-auto mt-24">
            <img src={cover_image} alt="" />
          </div>
          <strong className="text-xs text-accent text-center my-8 block">
            Posted on {date}
          </strong>
          <h1 className="text-center">{title2}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="my-24 mx-auto px-4 w-full md:w-1/2 blog-content">
          <ReactMarkdown>{content}</ReactMarkdown>
          {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div> */}
        </div>
      </div>

      {/* footer */}
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("pages/giai-dau/content"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join("pages/giai-dau/content", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
