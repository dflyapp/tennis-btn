import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Header, Footer } from "layouts";
import { Sponsors, Players } from "components";
import Cover from "assets/cover-main.jpeg";
import { sortByDate } from "utils";

const Home: NextPage = ({ events, players }: any) => {
  console.log(players);
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
          <h1 className="uppercase text-center text-primary font-bold text-xl">
            Nhà tài trợ
          </h1>
        </div>
        <Sponsors />

        {/* events */}
        <div className="px-4 my-24 w-full md:w-1/2 mx-auto">
          <h1 className="w-fit mx-auto px-3 py-2 text-white bg-primary uppercase text-center mt-12">
            Thông tin giải đấu mới
          </h1>
          {events &&
            events.map((e: any) => (
              <div className="mt-4" key={e.slug}>
                <img src={e.frontmatter.cover_image} alt="giai dau" />
                <div className="bg-gray-300 py-4 flex flex-wrap">
                  <div className="w-1/4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white">
                      <div className="bg-primary text-white text-center">
                        <p className="text-xs">
                          Tháng {dayjs(e.frontmatter.date).month() + 1}
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl text-center mt-1">
                          {dayjs(e.frontmatter.date).date()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-3/4 mt-2">
                    <p className="uppercase font-bold pr-4">
                      {e.frontmatter.title}
                    </p>
                    <button className="bg-white py-1 px-2 my-2 underline">
                      <a href={`/giai-dau/${e.slug}`}>Xem thêm</a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* leader board */}
        <div className="px-2 bg-gray-200 py-3">
          <h1 className="w-fit mx-auto px-3 py-2 text-white bg-primary uppercase text-center mt-12">
            Bảng điểm
          </h1>
          <div className="mt-4 mx-auto w-fit">
            <Link href="bang-diem/nam">
              <button className="bg-white text-primary px-4 py-2 mb-12">
                Trình Nam
              </button>
            </Link>
            <Link href="bang-diem/nu">
              <button className="ml-3 bg-white text-primary px-4 py-2 mb-12">
                Trình Nữ
              </button>
            </Link>
          </div>
        </div>

        {/* gallery */}
        <div className="px-2 py-3">
          <h1 className="w-fit mx-auto px-3 py-2 text-white bg-primary uppercase text-center mt-12">
            Hình ảnh
          </h1>
          <Players players={players} />
        </div>
      </main>

      {/* footer */}
      <Footer />
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

  const hinhAnh = fs.readdirSync(path.join("public/hinh-anh"));
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`);

  return {
    props: {
      players,
      events: posts.sort(sortByDate),
    },
  };
}
