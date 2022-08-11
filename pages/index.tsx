import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Header } from "layouts";
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
        />
        <div className="my-24 w-full md:w-1/2 mx-auto">
          <h1 className="text-blue-400">
            Welcome to Dien dan tennis Bac Trung Nam
          </h1>

          <h1 className="text-blue-200">
            Welcome to Dien dan tennis Bac Trung Nam
          </h1>

          <p>Get started by editing </p>
          <Link href="bang-diem">
            <button className="bg-blue-500 text-white px-4 py-2 my-12 rounded-md">
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
