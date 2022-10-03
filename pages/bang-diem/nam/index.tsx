import Head from "next/head";
import useSWR from "swr";
import fs from "fs";
import path from "path";

import { Header } from "layouts";
import { Loading } from "components";
import FilterTable from "./FilterTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Person = {
  id: number;
  nickName: string;
  max: number;
  min: number;
  mobile: string;
};

export default function BangDiem() {
  const { data, error } = useSWR("/api/score", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  const x = data[0].data.filter((e: any) => e.length >= 5 && e[0] > 0);
  // console.log(x);
  let result: Person[] = [];
  x.forEach((e: any) => {
    result.push({
      id: e[0],
      nickName: e[2],
      max: e[3],
      min: e[4],
      mobile: e[5],
    });
  });

  return (
    <>
      <Head>
        <title>Bảng điểm: Nam</title>
        <meta name="description" content="Bảng điểm dành cho nam" />
      </Head>
      <Header />

      <h1 className="text-center my-8">Bảng điểm nam</h1>

      <FilterTable dataSet={result} />
    </>
  );
}
