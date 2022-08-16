import Link from "next/link";
import useSWR from "swr";

import { Header } from "layouts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BangDiem() {
  const { data, error } = useSWR("/api/score", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      <p className="text-center mt-12 text-2xl">Bảng điểm</p>
      <div className="flex mx-auto w-fit mt-4">
        <Link href="bang-diem/nam">
          <button className="text-primary underline">Trình Nam</button>
        </Link>
        <Link href="bang-diem/nu">
          <button className="ml-4 text-primary underline">Trình Nữ</button>
        </Link>
      </div>

      {data.map((item: any) => (
        <div key={item}>
          <div className="flex">
            <p className="mr-2">{item.name}</p>
            <code>{JSON.stringify(item.data.length)}</code>
          </div>
          <div>
            {item.data.map((player: any) => (
              <div key={player} className="border">
                <p>player: {JSON.stringify(player)}</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
        </div>
      ))}
    </>
  );
}
