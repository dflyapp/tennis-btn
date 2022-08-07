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
        <h1>Bang Diem</h1>

        <div>hello {data.name}!</div>

        <Link className="text-blue-800" href="/">
          Ve lai trang chu
        </Link>
      </div>
    </>
  );
}
