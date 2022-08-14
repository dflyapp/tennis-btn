import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Header } from "layouts";
import { Sponsors } from "components";
import Logo from "assets/tennis-logo.png";
import Cover from "assets/cover-main.jpeg";
import { sortByDate } from "utils";

const Home: NextPage = ({ events }: any) => {
  return (
    <div>
      <Head>
        <title>Diễn đàn tennis BTN</title>
        <meta name="description" content="Diễn đàn tennis Bắc Trung Nam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto">
        <Image
          src={Cover}
          placeholder="blur"
          alt="Nhà tài trợ diễn đàn tennis BTN"
          layout="responsive"
        />

        {/* sponsors */}
        <div className="mt-6">
          <h1 className="uppercase text-center text-2xl">Nhà tài trợ</h1>
        </div>
        <Sponsors />

        {/* draft */}
        <div className="px-4 my-24 w-full md:w-1/2 mx-auto">
          <h1 className="text-blue-400">Các giải đấu</h1>
          {events &&
            events.map((e: any) => (
              <div className="mt-4" key={e}>
                <h1>{e.frontmatter.title}</h1>
              </div>
            ))}

          <h1 className="text-blue-500 mt-12">Bảng điểm</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, ea?
            Corrupti sit dicta quod delectus sed quae nihil quos consequuntur
            natus magni, pariatur doloribus soluta? Modi impedit corrupti hic
            voluptatibus?
          </p>
          <Link href="bang-diem">
            <button className="bg-blue-500 text-white px-4 py-2 mb-12 rounded-md">
              Xem Bang Diem
            </button>
          </Link>
        </div>
      </main>

      <footer>
        <div className="flex justify-center">
          <section>
            <p>Powered by </p>
            <span>
              <Image src={Logo} alt="Vercel Logo" width={72} height={72} />
            </span>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("pages/giai-dau/content"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("pages/giai-dau/content", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  console.log(posts);

  return {
    props: {
      events: posts.sort(sortByDate),
    },
  };
}
