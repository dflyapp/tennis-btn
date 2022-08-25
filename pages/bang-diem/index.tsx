import Link from "next/link";
import { Header } from "layouts";

export default function BangDiem() {
  return (
    <>
      <Header />
      {/* leader board */}
      <div className="px-2 bg-gray-100 py-3">
        <h1 className="w-fit mx-auto px-3 py-2 text-white bg-primary uppercase text-center mt-12">
          Bảng điểm
        </h1>
        <div className="mt-4 mx-auto w-fit">
          <Link href="bang-diem/nam">
            <button className="bg-white text-primary px-4 py-2 mb-12">
              Trình Nam
            </button>
          </Link>
          <Link href="bang-diem/nu">
            <button className="ml-3 bg-white text-primary px-4 py-2 mb-12">
              Trình Nữ
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
