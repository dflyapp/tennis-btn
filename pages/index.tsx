/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import classNames from "classnames";

import { Header, Footer } from "layouts";
import { Sponsors, Players, DialogEvent } from "components";
import Cover from "assets/cover-main.jpeg";
import { sortByDate } from "utils";

const Home: NextPage = ({ events, players }: any) => {
  const todaySubtract3 = dayjs(new Date()).subtract(3, "day");
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
          <h1 className="uppercase text-center font-bold text-xl">
            Nhà tài trợ
          </h1>
        </div>
        <Sponsors />

        {/* events */}
        <div className="px-4 mt-4 mb-24 w-full md:w-1/2 mx-auto">
          <h1 className="w-fit mx-auto px-3 py-2 uppercase text-center">
            Các giải đấu mới
          </h1>
          {/* hot events */}
          {events &&
            events.map((e: any) => {
              if (e.frontmatter.hot) {
                return (
                  <div className="mt-4" key={e.slug}>
                    <img src={e.frontmatter.cover_image} alt="giai dau" />
                    <div className="bg-gray-100 py-4 flex items-center flex-wrap rounded-bl-lg rounded-br-lg">
                      <div className="w-1/4 pt-1 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-md">
                          <div
                            className={classNames(
                              "text-white text-center rounded-tl-sm rounded-tr-sm",
                              {
                                "bg-red-500": dayjs(e.frontmatter.date).isAfter(
                                  dayjs(todaySubtract3)
                                ),
                                "bg-gray-400": dayjs(
                                  e.frontmatter.date
                                ).isBefore(dayjs(todaySubtract3)),
                              }
                            )}
                          >
                            <p className="text-xs">
                              Tháng {dayjs(e.frontmatter.date).month() + 1}
                            </p>
                          </div>
                          <div>
                            <p
                              className={classNames(
                                "text-3xl text-center mt-1",
                                {
                                  "opacity-50": dayjs(
                                    e.frontmatter.date
                                  ).isBefore(dayjs(todaySubtract3)),
                                }
                              )}
                            >
                              {dayjs(e.frontmatter.date).date()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-3/4">
                        <p className="uppercase font-bold pr-4 mb-4">
                          {e.frontmatter.title}
                        </p>

                        <DialogEvent content={e}>
                          <h1>---</h1>
                        </DialogEvent>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* normal events */}
          {events &&
            events.map((e: any) => {
              if (!e.frontmatter.hot) {
                return (
                  <div className="mt-4" key={e.slug}>
                    <img src={e.frontmatter.cover_image} alt="giai dau" />
                    <div className="bg-gray-100 py-4 flex items-center flex-wrap rounded-bl-lg rounded-br-lg">
                      <div className="w-1/4 pt-1 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-md">
                          <div
                            className={classNames(
                              "text-white text-center rounded-tl-sm rounded-tr-sm",
                              {
                                "bg-red-500": dayjs(e.frontmatter.date).isAfter(
                                  dayjs(new Date())
                                ),
                                "bg-gray-400": dayjs(
                                  e.frontmatter.date
                                ).isBefore(dayjs(new Date())),
                              }
                            )}
                          >
                            <p className="text-xs">
                              Tháng {dayjs(e.frontmatter.date).month() + 1}
                            </p>
                          </div>
                          <div>
                            <p
                              className={classNames(
                                "text-3xl text-center mt-1",
                                {
                                  "opacity-50": dayjs(
                                    e.frontmatter.date
                                  ).isBefore(dayjs(new Date())),
                                }
                              )}
                            >
                              {dayjs(e.frontmatter.date).date()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-3/4">
                        <p className="uppercase font-bold pr-4 mb-4">
                          {e.frontmatter.title}
                        </p>

                        <DialogEvent content={e}>
                          <h1>---</h1>
                        </DialogEvent>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <div className="flex justify-center mt-8">
            <Link href="/giai-dau">
              <button className="underline text-primary">
                Xem tất cả giải đấu
              </button>
            </Link>
          </div>
        </div>

        {/* leader board */}
        <div className="px-2 bg-gray-100 py-3">
          <h1 className="w-fit mx-auto px-3 py-2 uppercase text-center mt-12">
            Bảng điểm
          </h1>
          <div className="mt-4 flex justify-between px-24">
            <Link href="bang-diem/nam">
              <button className="bg-white rounded-md border border-gray-200 shadow-md text-primary px-4 py-2 mb-12">
                Trình Nam
              </button>
            </Link>
            <Link href="bang-diem/nu">
              <button className="bg-white rounded-md border border-gray-200 shadow-md text-primary px-4 py-2 mb-12">
                Trình Nữ
              </button>
            </Link>
          </div>
        </div>

        {/* gallery */}
        <div className="px-2 py-3">
          <h1 className="w-fit mx-auto px-3 py-2 uppercase text-center mt-12">
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

    const { data: frontmatter, content } = matter(markdownWithMeta);
    console.log(frontmatter);

    return {
      slug,
      frontmatter,
      content,
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
