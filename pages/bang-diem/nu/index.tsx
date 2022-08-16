import Link from "next/link";
import useSWR from "swr";

import { Header } from "layouts";
import Table from "./Table";
import FilterTable from "./FilterTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Person = {
  nickName: string;
  max: number;
  min: number;
  mobile: string;
};

export default function BangDiem() {
  const { data, error } = useSWR("/api/score", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const x = data[1].data.filter((e: any) => e.length === 5 || e.length === 6);
  // console.log(x);
  let result: Person[] = [];
  x.forEach((e: any) => {
    result.push({
      // id: e[0],
      nickName: e[2],
      max: e[3],
      min: e[4],
      mobile: e[5],
    });
  });
  console.log(result);

  return (
    <>
      <Header />

      <FilterTable dataSet={result} />
      {/* <FilterTable /> */}

      <div className="text-center my-24">
        <Link href="/bang-diem">
          <button className="bg-primary text-white px-4 py-2 my-12">
            Ve lai Bang diem
          </button>
        </Link>
        <h1 className="text-4xl">Bang Diem Nữ</h1>
        <Table dataSet={result} />
      </div>
    </>
  );
}
