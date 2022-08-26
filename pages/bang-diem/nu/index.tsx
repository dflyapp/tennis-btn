import useSWR from "swr";
import { Loading } from "components";
import { Header } from "layouts";
import FilterTable from "../FilterTable";
import Link from "next/link";

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
  if (!data) return <Loading />;

  const x = data[1].data.filter((e: any) => e.length >= 5 && e[0] > 0);
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

  return (
    <>
      <Header />
      <div className="flex my-12 w-fit mx-auto">
        <Link href="/bang-diem/nam">
          <button className="p-4 rounded-md shadow-md border bg-white text-primary">
            Trình Nam
          </button>
        </Link>
        <Link href="/bang-diem/nu">
          <button className="ml-3 rounded-md shadow-md p-4 border bg-primary text-white">
            Trình Nữ
          </button>
        </Link>
      </div>
      <FilterTable dataSet={result} />
    </>
  );
}
