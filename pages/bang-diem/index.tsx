import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BangDiem() {
  const { data, error } = useSWR("/api/score", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="text-center my-24">
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 my-12 rounded-md">
            Ve lai trang chu
          </button>
        </Link>
        <h1 className="text-4xl">Bang Diem {data.length}</h1>

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

        {/* <code>{JSON.stringify(data)}</code> */}

        {/* {data.map((item: any) => {
          <p>{JSON.stringify(item)}</p>;
        })} */}

        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 my-12 rounded-md">
            Ve lai trang chu
          </button>
        </Link>
      </div>
    </>
  );
}
