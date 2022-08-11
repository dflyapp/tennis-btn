import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Header } from "layouts";
import { Sponsors } from "components";
import Logo from "assets/tennis-logo.png";
import Cover from "assets/cover-main.jpeg";

const Home: NextPage = () => {
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
        <Sponsors />

        {/* draft */}
        <div className="px-4 my-24 w-full md:w-1/2 mx-auto">
          <h1 className="text-blue-400">Các giải đấu</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            mollitia. Aliquid eos hic neque voluptatum beatae porro accusamus
            quae error, et similique asperiores veritatis, nesciunt officia
            voluptatem. Dolorum, commodi eius?
          </p>

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
