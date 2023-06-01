import fs from "fs";
import path from "path";

import { Header } from "layouts";

export default function HinhAnh({ players }: any) {
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto">
        <div className="flex flex-wrap justify-center">
          {players.map((e: any) => {
            return (
              <div className="my-8" key={e}>
                <img src={e} alt={e} />
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
}

export async function getStaticProps() {
  const hinhAnh = fs.readdirSync(path.join("public/hinh-anh"));
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`);
  console.log(players);

  return {
    props: {
      players,
    },
  };
}
