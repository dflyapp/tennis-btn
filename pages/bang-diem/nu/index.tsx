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
      <div className="text-center my-24">
        <Link href="/bang-diem">
          <button className="bg-primary text-white px-4 py-2 my-12">
            Ve lai Bang diem
          </button>
        </Link>
        <h1 className="text-4xl">Bang Diem Nữ</h1>

        {data.map((item: any, index: number) => (
          <div key={item}>
            <div>
              {index === 1 &&
                item.data.map((player: any) => {
                  if (player[0] > 0 && player[2] !== "") {
                    return (
                      <div key={player} className="border">
                        {/* <p>player: {JSON.stringify(player)}</p> */}
                        <div className="flex items-cente py-4">
                          <p>{player[2]}</p>
                          <p className="ml-3">{player[3]}</p>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </>
  );
}
