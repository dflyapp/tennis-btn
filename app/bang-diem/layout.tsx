import Footer from 'components/Footer'
import Header from 'components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="h-20" />
      {/* TẠM THỜI BẢO TRÌ - bỏ comment bên dưới để khôi phục */}
      {/* {children} */}

      {/* under maintain */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">
          Trang đang bảo trì
        </h1>
        <p className="text-gray-500">
          Chúng tôi đang nâng cấp tính năng này. Vui lòng quay lại sau!
        </p>
      </div>

      <div className="h-12" />
      <Footer />
    </>
  )
}
