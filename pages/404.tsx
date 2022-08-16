import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1>404 - Không Tìm Thấy Trang</h1>
        <div className="flex items-center justify-center mt-12">
          <Link href="/">
            <button className="bg-primary text-white p-4">Về Trang Chủ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
