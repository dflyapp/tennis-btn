import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Logo from "./tennis-logo.png";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Diễn đàn tennis BTN</title>
        <meta name="description" content="Diễn đàn tennis Bắc Trung Nam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-blue-400">
          Welcome to Dien dan tennis Bac Trung Nam
        </h1>

        <p>Get started by editing </p>
      </main>

      <footer>
        Powered by{" "}
        <span>
          <Image src={Logo} alt="Vercel Logo" width={72} height={72} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
